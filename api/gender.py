import requests

GENDER_API = "https://gender-api.com/"

def getGender(name):
  request_url = GENDER_API + "get?name=" + name + "&key=ycRMCVQhJKdBUFrcnX"

  r = requests.get(request_url)
  if r.status_code == 200:
    result = r.json()
    print(result)
    result = {
      "name": result['name'],
      "name_sanitized": result['name_sanitized'],
      "gender": {
        "gender": result['gender'],
        "accuracy": result['accuracy'],
      }
    }

    return result
  else:
    error_message = 'error'
    return error_message.json()