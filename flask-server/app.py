from flask import Flask
from flask import request
from flask_cors import CORS
from .data import getMatchingFips, get_date_all_states, get_date_all_county
from .visualization_tracker import VisualizationTracker


app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

tracker = VisualizationTracker()


@app.route("/")
def hello():
    return "Hello, World (api)!"


@app.route("/get-vis-link", methods=["POST"])
def get_vis_link():
    settings = request.json["selection"]
    link_id = tracker.save_visualization(settings)
    return {"link_id": link_id}


def get_data_for_selection(selection):
    # Get the data.
    date = selection["date"]
    selection_type = selection.get("type", "states")
    if selection_type == "states":
        data = get_date_all_states(date)
    else:
        data = get_date_all_county(date)

    # Apply the filters.
    matching_fips = getMatchingFips(
        selection, "states" if selection_type == "states" else "county"
    )
    result = {}
    for fips in matching_fips["data"]:
        fips_str = str(fips)
        result[str(int(float(fips_str)))] = data.get(fips_str, [0, 0])

    return result


@app.route("/load-vis-link", methods=["POST"])
def load_vis_link():
    key = request.json["key"]
    settings = tracker.get_visualization(key)
    return {"settings": settings, "result": get_data_for_selection(settings)}


@app.route("/data", methods=["POST"])
def get_data():
    selection = request.json.get("selection", {})
    return get_data_for_selection(selection)
