import datetime
import requests


def get_games(offset, platform_id, region_id):
    url = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/"
    headers = {"X-Mashape-Key": "bG0dKjGLA2mshtUac7LbEm8KeZu8p1TxAo4jsn3GrypqBL6csY"}
    # Pops the Offset with ajax When user reaches the end of the page
    params = {"filter[release_dates.date][gte]": datetime.date.today(),
              "fields": '*',
              "limit": 48,
              "order": "release_dates.date:asc",
              "offset": offset}
    # User wants to filer with platform id
    if platform_id is not 0:
        params["filter[release_dates.platform][eq]"] = platform_id
    if region_id is not 0:
        params["filter[release_dates.region][eq]"] = region_id
    r = requests.get(url, headers=headers, params=params)
    games = r.json()
    # Returns JSON Array
    return games


# Get the game in which its id matched the id passed as parameter
def get_game(id):
    url = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/" + id
    headers = {"X-Mashape-Key": "bG0dKjGLA2mshtUac7LbEm8KeZu8p1TxAo4jsn3GrypqBL6csY"}
    params = {"fields": '*'}
    r = requests.get(url, headers=headers, params=params)
    game = r.json()
    return game
