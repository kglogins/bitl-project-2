from flask import Flask, render_template
from api.agify import getAge
from api.nationalize import getNationality
from api.gender import getGender

app = Flask(__name__, template_folder="templates")

@app.route('/')
def root():
  return render_template("index.html")


@app.route('/name/<name>')
def getInfo(name):
  result = getAge(name)
  result.update(getGender(name))
  result.update(getNationality(name))
  return result

app.run(host='0.0.0.0', port=3333)