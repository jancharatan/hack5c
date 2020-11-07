import pandas as pd
import csv
counties = "us-counties.csv"
counties = pd.read_csv(counties)

#check to see if loading correctly:
#counties_test = counties.head(10)
#print(counties_test)

#return dictionnary of county -> # cases, # deaths]
#my_date should be formatted correctly 
def get_date(my_date):
    county_map = {}
    date_specific = counties[counties['date']== my_date]
    for ind in date_specific.index: 
        fips = date_specific['fips'][ind]
        cases = date_specific['cases'][ind]
        deaths = date_specific['deaths'][ind]
        #print(fips, cases, deaths)
        county_map[fips] = [cases, deaths]
    return county_map

#example 
#print(get_date('2020-04-25'))