import requests
from unidecode import unidecode
from api.country import getCountryCode, getCountryName

NATIONALIZE_API = "https://api.nationalize.io"

def getNationality(name):
  request_url = NATIONALIZE_API + "?name=" + unidecode(name)

  r = requests.get(request_url)
  if r.status_code == 200:
    result = r.json()
    del result["name"]
    
    for country in result['country']:
      country['id'] = getCountryCode(country['country_id'])
      country['name'] = getCountryName(country['country_id'])
      del country['country_id']

    print(result)

    return result
  else:
    error_message = 'error'
    return error_message.json()