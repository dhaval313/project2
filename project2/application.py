import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = ['demo']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST","GET"])
def login():
    global channels
    if request.form.get('flag') == 1:
        channels.append(request.form.get('new'))
        request.form.get('flag') = 0

    return render_template("home.html", names=channels)
