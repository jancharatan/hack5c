import pandas as pd
import csv

# load data
counties = "us-counties.csv"
states = "us-states.csv"
counties = pd.read_csv(counties)
states = pd.read_csv(states)

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
