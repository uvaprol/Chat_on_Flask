from pickle import GLOBAL

from flask import Flask, render_template, request, jsonify, redirect
import sqlite3

USERS = {'admin': 'admin'}
MESSAGES = []

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('enter.html')

@app.route('/chat')
def open_chat():
    if request.method == 'GET':
        if USERS.get(request.args.get('login')):
            return render_template('chat.html')
        else:
            return redirect('/login')

@app.route('/login')
def registration():
    return render_template('login.html')

@app.route('/checkReg', methods=['POST'])
def check_registration():
    global USERS
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if USERS.get(login):
            return jsonify({'error': 'Login is busy'}), 400
        else:
            USERS[login] = password
            return jsonify({'redirect': '/'}), 200
    else:
        return jsonify({'error': 'Uncorrected method'}), 400

@app.route('/checkLog', methods=['POST'])
def check_login():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if USERS.get(login) == password:
            return jsonify({'redirect': '/chat'}), 200
        else:
            return jsonify({'error': 'Uncorrected logs'}), 400
    else:
        return jsonify({'error': 'Uncorrected method'}), 400

@app.route('/setMessage', methods=['POST'])
def add_message():
    global USERS, MESSAGES
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        text = request.form.get('text')
        if USERS.get(login) == password:
            MESSAGES.append((login, text))
            return jsonify({'success': 'message will load'}), 200
        else:
            return jsonify({'error': 'Bad logs'}), 400
    else:
        return jsonify({'error': 'Bad methods'}), 400

@app.route('/getMessage', methods=['POST'])
def send_message():
    global USERS, MESSAGES
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if USERS.get(login) == password:
            return jsonify({'data': MESSAGES}), 200
        else:
            return jsonify({'error': 'Bad logs'}), 400
    else:
        return jsonify({'error': 'Bad methods'}), 400

app.run(host='0.0.0.0', port=80)