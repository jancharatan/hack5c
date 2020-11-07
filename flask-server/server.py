from flask import Flask
from flask import request
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/hello", methods=["GET"])
def say_hello():
    return "Hello"
