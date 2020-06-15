import os

from flask import Flask, render_template, request, redirect, url_for
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
    return render_template("home.html", names=channels)

@app.route("/new_channel", methods=["POST"])
def new_channel():
    new = request.form.get('channel_name')
    if new not in channels and len(new) <= 20:
        channels.append(new)

    return redirect(url_for("login"))
