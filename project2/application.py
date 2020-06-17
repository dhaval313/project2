import os, json

from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

messages = {"demo":[['root','Hello'], ['root1','Hi']]}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST","GET"])
def login():
    channels = []
    for key in messages:
        channels.append(key)
    return render_template("home.html", names=channels)

@app.route("/new_channel", methods=["POST"])
def new_channel():
    new = request.form.get('channel_name')
    if new not in messages and len(new) <= 20:
        messages[new] = []

    return redirect(url_for("login"))

@app.route("/channel/<string:channel>", methods=["POST", "GET"])
def channel(channel):
    
    return jsonify({channel: messages[channel]})
