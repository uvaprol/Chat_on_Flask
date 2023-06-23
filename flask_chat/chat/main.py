from flask import Flask, render_template, request, url_for
import json
from datetime import datetime




def load_message():
    with open('db.json', 'r') as json_file:
        data = json.load(json_file)
    return data['messages']

def add_message(sender, text):
    new_message = {
        'sender': sender,
        'text': text,
        'time': datetime.now().strftime('%H:%M')
    }
    all_messages.append(new_message)

def save_messages():
    data = {
        'messages': all_messages
    }
    with open('db.json', 'w') as json_file:
        json.dump(data, json_file)



all_messages = load_message()

app = Flask(__name__)


@app.route('/index')
def index_page():
    return 'hello'

@app.route('/chat')
def display_chat():
    return render_template('index.html')

@app.route('/get_messages')
def display_message():
    return {'messages': all_messages}

@app.route('/send_message')
def send_message():
    sender = request.args['name']
    text = request.args['text']
    add_message(sender, text)
    save_messages()
    return True


app.run(host='0.0.0.0', port=80)



