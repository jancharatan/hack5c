from flask import Flask
from flask import request
from flask_cors import CORS
from .data import get_date_all_states


app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/hello", methods=["GET"])
def say_hello():
    return "Hello"


@app.route("/get-all-state-data-for-date", methods=["POST"])
def get_all_state_data_for_date():
    date = request.json["date"]
    return get_date_all_states(date)


@app.route("/get-date-data", methods=["POST"])
def date_post_route():
    date = request.json["date"]
    return {"message": f"You asked for the date {date}!"}


@app.route("/get-county-data", methods=["POST"])
def county_post_route():
    county = request.json["county"]
    return {"message": f"You asked for the date {county}!"}
