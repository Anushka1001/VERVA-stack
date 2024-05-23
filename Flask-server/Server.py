import uuid
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from datetime import timedelta
from functions import generate_user_id

localhost = "http://localhost:3000"

app = Flask(__name__)

bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myapp.db'
db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
jwt = JWTManager(app)

# table for registered users
class user_details(db.Model):
    __tablename__ = 'users_registered'
    user_id = db.Column(db.String(12), primary_key=True, unique=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    v_id = db.Column(db.String(8), unique=True, nullable=False)
    user_password = db.Column(db.String(50), nullable=False)
    user_password_inText = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self) -> str:
        return f"{self.user_id} - {self.email} - {self.user_password} - {self.name} - {self.age} - {self.user_password_inText} - {self.v_id} - {self.status}"

# table for registered users
class stream_details(db.Model):
    __tablename__ = 'stream_details'
    stream_id = db.Column(db.String(12), primary_key=True, unique=True, default=str(uuid.uuid4()))
    user_email = db.Column(db.String(12), default=str(uuid.uuid4()))
    v_id = db.Column(db.String(8), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(100), nullable=False)

    def __repr__(self) -> str:
        return f"{self.stream_id} - {self.user_email} - {self.v_id} - {self.title} - {self.description}"

# table for deleted user data saved for next 10 months or 300 days
class saved_user_details(db.Model):
    __tablename__ = 'saved_user_details'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    v_id = db.Column(db.String(8), unique=True, nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"{self.email} - {self.password} - {self.name} - {self.age} - {self.v_id}"

with app.app_context():
    db.create_all()

CORS(app, resources={r"/register": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/login": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/protected": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/update-name": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/update-pass": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/delete-account": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/update-creator-status": {"origins": localhost}}, supports_credentials=True)
CORS(app, resources={r"/uploadVideo": {"origins": localhost}}, supports_credentials=True)

# route for registring a user
@app.route("/register", methods=['POST', 'GET'])
def register():
    try:
        if request.method == "POST":
            user_email = request.json.get('user_email')
            user_password_recieved = request.json.get('user_password')
            name = request.json.get('name')
            age = request.json.get('age')
            user_id = str(uuid.uuid4())
            while user_details.query.filter_by(user_id=user_id).first():
                user_id = str(uuid.uuid4())
            v_id = generate_user_id()
            while user_details.query.filter_by(v_id=v_id).first():
                v_id = generate_user_id()

            hashed_password = bcrypt.generate_password_hash(user_password_recieved).decode('utf-8')
            userDetails = user_details(user_id=user_id, email=user_email, user_password=hashed_password, user_password_inText=user_password_recieved, name=name, age=age, v_id=v_id, status='user')
            db.session.add(userDetails)
            db.session.commit()

            user_id = userDetails.user_id
            access_token = create_access_token(identity=user_id)

            response_data = {
                "success": True,
                "message": "User registered successfully",
                "user": {'email': userDetails.email, 'name': userDetails.name, 'age': userDetails.age, 'v_id':userDetails.v_id},
                "token": access_token
            }

            response = make_response(jsonify(response_data), 200)
            set_access_cookies(response, access_token)

            response.headers.add("Access-Control-Allow-Origin", localhost)
            response.headers.add("Access-Control-Allow-Credentials", "true")

            return response

        elif request.method == "GET":
            user_details_list = user_details.query.all()
            user_details_dicts = [{'user_id': user.user_id, 'email': user.email, 'user_password': user.user_password, 'name': user.name, 'age': user.age, 'user_password_inText': user.user_password_inText, 'v_id':user.v_id, 'creatorStatus':user.status} for user in user_details_list]
            response = make_response(jsonify(user_details_list=user_details_dicts), 200)
            return response

    except Exception as e:
        print(str(e))
        response = make_response(jsonify({"error": "Internal Server Error"}), 500)
        response.headers.add("Access-Control-Allow-Origin", localhost)
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response

# route for login
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
            v_id = user.v_id
            status =user.status
            userDetails = {"name": user_name, "email": user_email, "age": user_age, "v_id":v_id, 'status':status}
            access_token = create_access_token(identity=user_id)
            response = jsonify({'success': True, 'message': 'Login successful', 'access_token': access_token, 'userDetails': userDetails})
            set_access_cookies(response, access_token)
            return response
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    elif request.method == "GET":
        return jsonify({'message': 'This route is for user login'})

# route for updating name
@app.route("/update-name", methods=['PUT'])
@jwt_required()
def update_name():
    try:
        current_user = get_jwt_identity()
        user = user_details.query.filter_by(user_id=current_user).first()
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        new_name = request.json.get('name')
        if not new_name:
            return jsonify({'success': False, 'message': 'New name is required'}), 400
        user.name = new_name
        db.session.commit()
        return jsonify({'success': True, 'message': 'Name updated successfully'})

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Server Error"}), 500

# route for changing a password
@app.route("/update-pass", methods=['PUT'])
@jwt_required()
def update_pass():
    try:
        current_user = get_jwt_identity()
        user = user_details.query.filter_by(user_id=current_user).first()
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        old_pass = request.json.get('old_pass')
        new_pass = request.json.get('new_pass')
        if user.user_password_inText == old_pass :
            new_hashed_pass = bcrypt.generate_password_hash(new_pass).decode('utf-8')
            if not new_hashed_pass:
                return jsonify({'success': False, 'message': 'New pass is required'}), 400
            if ( user.user_password_inText == new_pass):
                return jsonify({'success': False, 'message': 'New pass can\'t be same as The Old Pass'}), 400
            user.user_password = new_hashed_pass
            user.user_password_inText = new_pass
            db.session.commit()
            return jsonify({'success': True, 'message': 'Pass updated successfully'})
        else :
            return jsonify({'success': False, 'message': 'Old Pass not same'})

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Server Error"}), 500

# route for deleting an account
@app.route("/delete-account", methods=['DELETE'])
@jwt_required()
def delete_account():
    try:
        current_user = get_jwt_identity()
        user = user_details.query.filter_by(user_id=current_user).first()
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        else:
            saved_user = saved_user_details(email=user.email, password=user.user_password_inText,
                                            name=user.name, age=user.age, v_id=user.v_id)
            db.session.add(saved_user)
            db.session.delete(user)
            db.session.commit()
            # query_and_delete_old_entries()
            return jsonify({'success': True, 'message': 'User Deleted from Database.'})

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Server Error"}), 500

# route for updating creator status
@app.route("/update-creator-status", methods=['POST'])
@jwt_required()
def update_creator():
    try:
        current_user = get_jwt_identity()
        user = user_details.query.filter_by(user_id=current_user).first()
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        status = request.json.get('status')
        user.status = status
        db.session.commit()
        return jsonify({'success': True, 'message': 'status updated successfully'})

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Server Error"}), 500

# upload video
@app.route("/uploadVideo", methods=['POST','GET'])
def upload_Video():
    try:
        if request.method == "POST":
            if request.content_type != 'application/json':
                return make_response(jsonify({"error": "Content-Type must be application/json"}), 415)

            user_email = request.json.get('user_email')
            v_id = request.json.get('v_id')
            title = request.json.get('title')
            description = request.json.get('description')
            stream_id = str(uuid.uuid4())
            while stream_details.query.filter_by(stream_id=stream_id).first():
                stream_id = str(uuid.uuid4())
            
            # Assuming you have a function to create and save the stream details
            streamDetails = stream_details(stream_id=stream_id, user_email=user_email, v_id=v_id, title=title, description=description)
            db.session.add(streamDetails)
            db.session.commit()

            response_data = {
                "success": True,
                "message": "User uploaded a video successfully",
                "user": {
                    'stream_id': streamDetails.stream_id,
                    'email': streamDetails.user_email,
                    'v_id': streamDetails.v_id,
                    'title': streamDetails.title,
                    'description': streamDetails.description
                }
            }

            response = make_response(jsonify(response_data), 200)
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Access-Control-Allow-Credentials", "true")

            return response

        elif request.method == "GET":
            stream_details_list = stream_details.query.all()
            stream_details_dicts = [{'stream_id': stream.stream_id, 'user_email': stream.user_email, 'v_id':stream.v_id, 'title':stream.title, 'description':stream.description} for stream in stream_details_list]
            response = make_response(jsonify(stream_details_list=stream_details_dicts), 200)
            return response

    except Exception as e:
        print(str(e))
        response = make_response(jsonify({"error": "Internal Server Error"}), 500)
        response.headers.add("Access-Control-Allow-Origin", localhost)
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response


# -------------------------------------------------------------------------------------------- #
# route for jwt token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(debug=True)