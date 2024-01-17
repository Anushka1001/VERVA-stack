from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/member": {"origins": "http://localhost:3000"}})

@app.route("/member", methods=['GET'])
def member():
    return {"member" : ["member1", "member2"]}

if __name__ == "__main__":
    app.run(debug=True)