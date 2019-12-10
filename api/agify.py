import requests

AGIFY_API = "https://api.agify.io"

def getAge(name):
  request_url = AGIFY_API + "?name=" + name

  r = requests.get(request_url)
  if r.status_code == 200:
    result = r.json()
    del result['count'], result['name']

    return result
  else:
    error_message = 'error'
    return error_message.json()