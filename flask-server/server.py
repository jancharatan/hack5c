from flask import Flask
from flask import request
from flask_cors import CORS
from .data import get_date_all_states
from .data import getMatchingFips
from .visualization_tracker import VisualizationTracker


app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

tracker = VisualizationTracker()


@app.route("/hello", methods=["GET"])
def say_hello():
    return "Hello"


@app.route("/get-vis-link", methods=["POST"])
def get_vis_link():
    settings = request.json["settings"]
    link_id = tracker.save_visualization(settings)
    return {"link_id": link_id}


@app.route("/get-all-state-data-for-date", methods=["POST"])
def get_all_state_data_for_date():
    date = request.json["date"]
    return get_date_all_states(date)


@app.route("/get-all-data-for-constraints", methods=["POST"])
def get_all_data_for_constraints():
    constraints = request.json["constraints"]
    # map_type should either be county or state
    map_type = request.json["map_type"]
    return getMatchingFips(constraints, map_type)


@app.route("/get-date-data", methods=["POST"])
def date_post_route():
    date = request.json["date"]
    return {"message": f"You asked for the date {date}!"}


@app.route("/get-county-data", methods=["POST"])
def county_post_route():
    county = request.json["county"]
    return {"message": f"You asked for the date {county}!"}
