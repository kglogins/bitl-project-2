import requests

COUNTRY_API = "https://restcountries.eu/rest/v2/alpha/"

def getCountryCode(country):
  request_url = COUNTRY_API + country

  r = requests.get(request_url)
  if r.status_code == 200:
    result = r.json()

    return result['alpha3Code']
  else:
    error_message = 'error'
    return error_message.json()

def getCountryName(country):
  request_url = COUNTRY_API + country

  r = requests.get(request_url)
  if r.status_code == 200:
    result = r.json()

    return result['name']
  else:
    error_message = 'error'
    return error_message.json()