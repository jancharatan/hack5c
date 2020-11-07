import pandas as pd
import csv

# load data
counties = "us-counties.csv"
states = "us-states.csv"
demographics = "demographic.csv"
counties = pd.read_csv(counties)
states = pd.read_csv(states)
dems = pd.read_csv(
    demographics,
    usecols=[
        "State",
        "County",
        "TotalPop",
        "Men",
        "Women",
        "Hispanic",
        "White",
        "Black",
        "Native",
        "Asian",
        "Pacific",
        "Income",
    ],
)
dems = dems.rename(columns={"State": "state", "County": "county"})

# merge demographic info w counties
counties_merged = pd.merge(dems, counties, how="left", on=["state", "county"])
counties_merged = counties_merged.dropna(subset=["fips"])
# merge demographic info w states
states_merged = pd.merge(dems, states, how="left", on=["state"])
states_merged = states_merged.dropna(subset=["fips"])

# check to see if loading correctly:
# counties_test = counties.head(10)
# print(counties_test)

# return dictionnary of county -> # cases, # deaths]
# my_date should be formatted correctly
def get_date_all_county(my_date):
    county_map = {}
    date_specific = counties[counties["date"] == my_date]
    for ind in date_specific.index:
        fips = date_specific["fips"][ind]
        cases = date_specific["cases"][ind]
        deaths = date_specific["deaths"][ind]
        # print(fips, cases, deaths)
        county_map[fips] = [cases, deaths]
    return county_map


# example
# print(get_date('2020-04-25'))

# same as above, but for states
def get_date_all_states(my_date):
    state_map = {}
    date_specific = states[states["date"] == my_date]
    for ind in date_specific.index:
        fips = date_specific["fips"][ind]
        cases = date_specific["cases"][ind]
        deaths = date_specific["deaths"][ind]
        # print(fips, cases, deaths)
        state_map[fips] = [cases, deaths]
    return state_map


# print(get_date_all_states('2020-04-25'))

# get data per state
def get_date_per_state(my_date, my_state_fip):
    state_info = get_date_all_states(my_date)[my_state_fip]
    return {my_state_fip: state_info}


# print("***")
# print(get_date_per_state('2020-04-25', 41))

# constraints keys should be Asian, White ... etc. Values should be [min, max]
def getMatchingFips(constraints, toggle):
    if toggle == "county":
        left_merged = counties_merged
    else:
        left_merged = states_merged

    Men = constraints.get("Men", [float("-inf"), float("inf")])
    Women = constraints.get("Women", [float("-inf"), float("inf")])
    Hispanic = constraints.get("Hispanic", [float("-inf"), float("inf")])
    White = constraints.get("White", [float("-inf"), float("inf")])
    Black = constraints.get("Black", [float("-inf"), float("inf")])
    Native = constraints.get("Native", [float("-inf"), float("inf")])
    Asian = constraints.get("Asian", [float("-inf"), float("inf")])
    Pacific = constraints.get("Pacific", [float("-inf"), float("inf")])
    Income = constraints.get("Income", [float("-inf"), float("inf")])

    sorted_data = left_merged[
        (left_merged.Men >= Men[0])
        & (left_merged.Men <= Men[1])
        & (left_merged.Women >= Women[0])
        & (left_merged.Women <= Women[1])
        & (left_merged.Hispanic >= Hispanic[0])
        & (left_merged.Hispanic <= Hispanic[1])
        & (left_merged.White >= White[0])
        & (left_merged.White <= White[1])
        & (left_merged.Black >= Black[0])
        & (left_merged.Black <= Black[1])
        & (left_merged.Native >= Native[0])
        & (left_merged.Native <= Native[1])
        & (left_merged.Asian >= Asian[0])
        & (left_merged.Asian <= Asian[1])
        & (left_merged.Pacific >= Pacific[0])
        & (left_merged.Pacific <= Pacific[1])
        & (left_merged.Income >= Income[0])
        & (left_merged.Income <= Income[1])
    ]

    return list(set(sorted_data["fips"]))


# print(getMatchingFips({'Asian' : [10, 20], 'White' : [30, 100]}, 'county'))
