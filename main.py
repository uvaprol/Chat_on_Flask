from flask import Flask, render_template, request, jsonify, redirect
import sqlite3

USERS = {}

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('enter.html')

@app.route('/chat')
def open_chat():
    return render_template('chat.html')

@app.route('/login')
def registration():
    return render_template('login.html')

@app.route('/checkReg', methods=['POST'])
def check_registration():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if USERS.get(login):
            return 400
        else:
            USERS[login] = password
            redirect('/chat')

@app.route('/checkLog', methods=['POST'])
def check_login():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if USERS.get(login) == password:
            redirect('/chat')
        else:
            redirect('/login')

app.run(host='0.0.0.0', port=80)