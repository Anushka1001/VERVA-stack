import uuid
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from datetime import timedelta

app = Flask(__name__)

bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myapp.db'
db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
jwt = JWTManager(app)

class user_details(db.Model):
    user_id = db.Column(db.String(12), primary_key=True, unique=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    user_password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self) -> str:
        return f"{self.user_id} - {self.email} - {self.user_password} - {self.name} - {self.age}"

with app.app_context():
    db.create_all()

CORS(app, resources={r"/register": {"origins": "http://localhost:3000"}}, supports_credentials=True)
CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}}, supports_credentials=True)
CORS(app, resources={r"/protected": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route("/register", methods=['POST', 'GET'])
def register():
    try:
        if request.method == "POST":
            user_email = request.json.get('user_email')
            user_password = request.json.get('user_password')
            name = request.json.get('name')
            age = request.json.get('age')
            user_id = str(uuid.uuid4())
            while user_details.query.filter_by(user_id=user_id).first():
                user_id = str(uuid.uuid4())

            hashed_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
            userDetails = user_details(user_id=user_id, email=user_email, user_password=hashed_password, name=name, age=age)
            db.session.add(userDetails)
            db.session.commit()

            user_id = userDetails.user_id
            access_token = create_access_token(identity=user_id)

            response_data = {
                "success": True,
                "message": "User registered successfully",
                "user": {'email': userDetails.email, 'name': userDetails.name, 'age': userDetails.age},
                "token": access_token
            }

            response = make_response(jsonify(response_data), 200)
            set_access_cookies(response, access_token)

            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Access-Control-Allow-Credentials", "true")

            return response

        elif request.method == "GET":
            user_details_list = user_details.query.all()
            user_details_dicts = [{'id': user.user_id, 'email': user.email, 'user_password': user.user_password, 'name': user.name, 'age': user.age} for user in user_details_list]
            response = make_response(jsonify(user_details_list=user_details_dicts), 200)
            return response

    except Exception as e:
        print(str(e))
        response = make_response(jsonify({"error": "Internal Server Error"}), 500)
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response

@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == "POST":
        user_email = request.json.get('user_email')
        user_password = request.json.get('user_password')
        user = user_details.query.filter_by(email=user_email).first()
        if user and bcrypt.check_password_hash(user.user_password, user_password):
            user_id = user.user_id
            user_name = user.name
            user_email = user.email
            user_age = user.age
            userDetails = {"name": user_name, "email": user_email, "age": user_age}
            access_token = create_access_token(identity=user_id)
            response = jsonify({'success': True, 'message': 'Login successful', 'access_token': access_token, 'userDetails': userDetails})
            set_access_cookies(response, access_token)
            return response
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    elif request.method == "GET":
        return jsonify({'message': 'This route is for user login'})

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(debug=True)