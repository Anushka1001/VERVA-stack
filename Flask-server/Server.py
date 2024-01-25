# # class form_details(db.Model):
# #     sno = db.Column(db.Integer, primary_key=True)
# #     curr_user_id = db.Column(db.String(12), db.ForeignKey('user_details.user_id'), nullable=False)
# #     price = db.Column(db.Integer)
# #     date = db.Column(db.Date)
# #     month = db.Column(db.Integer)
# #     year = db.Column(db.Integer)
# #     auto = db.Column(db.Boolean)

# #     def __repr__(self) -> str:
# #         return f"{self.sno} - {self.curr_user_id} - {self.price} - {self.auto} - {self.date}"

# # CORS(app, resources={r"/add": {"origins": "http://localhost:3000"}})

# # @app.route("/add", methods=['POST'])
# # def add():
# #     if request.method == "POST":
# #         curr_user_id = request.json.get('user_id')
# #         price = request.json.get('price')
# #         auto = request.json.get('auto')
# #         date = request.json.get('date')
# #         month = request.json.get('month')
# #         year = request.json.get('year')
# #         formDetails = form_details(curr_user_id=curr_user_id, price=price, auto=auto, date=date, month=month, year=year)
# #         db.session.add(formDetails)
# #         db.session.commit()
# #     form_details_list = form_details.query.all()
# #     return jsonify(form_details_list)

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_bcrypt import Bcrypt

app = Flask(__name__)

bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myapp.db'
db = SQLAlchemy(app)

class user_details(db.Model):
    user_id = db.Column(db.String(12), primary_key=True, unique=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(50), primary_key=True, nullable=False)
    user_password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self) -> str:
        return f"{self.user_id} - {self.email} - {self.user_password} - {self.name} - {self.age}"

with app.app_context():
    db.create_all()

CORS(app, resources={r"/register": {"origins": "http://localhost:3000"}}, supports_credentials=True)
CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route("/register", methods=['POST', 'GET'])
def register():
    try:
        if request.method == "POST":
            user_email = request.json.get('user_email')
            user_password = request.json.get('user_password')
            name = request.json.get('name')
            age = request.json.get('age')
            existing_user = user_details.query.filter_by(email=user_email).first()
            if existing_user:
                return jsonify({'success': False, 'message': 'User with this email already exists'})

            hashed_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
            userDetails = user_details(email=user_email, user_password=hashed_password, name=name, age=age)
            db.session.add(userDetails)
            db.session.commit()

            response = make_response(jsonify({"message": "User registered successfully", "user": {'email': userDetails.email, 'name': userDetails.name, 'age': userDetails.age}}), 200)
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            return response

        elif request.method == "GET":
            user_details_list = user_details.query.all()
            user_details_dicts = [{'email': user.email, 'user_password': user.user_password, 'name': user.name, 'age': user.age} for user in user_details_list]
            response = make_response(jsonify(user_details_list=user_details_dicts), 200)
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Access-Control-Allow-Credentials", "true")
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
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    elif request.method == "GET":
        return jsonify({'message': 'This route is for user login'})

if __name__ == "__main__":
    app.run(debug=True)