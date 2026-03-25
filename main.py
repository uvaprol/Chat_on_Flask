from flask import Flask, render_template, request, jsonify, redirect
import sqlite3

USERS = {'admin': 'admin'}

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('enter.html')

@app.route('/chat', methods=['GET', 'POST'])
def open_chat():
    if request.method == 'GET':
        print(request.args.get('login'))
        if USERS.get(request.args.get('login')):
            return render_template('chat.html')
        else:
            return redirect('/login')
    elif request.method == 'POST':
        print(request.form)

@app.route('/login')
def registration():
    return render_template('login.html')

@app.route('/checkReg', methods=['POST'])
def check_registration():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        print(login, password)
        if USERS.get(login):
            USERS[login] = password
            return jsonify({'redirect': '/chat'}), 200
        else:
            return jsonify({'error': 'Bad data'}), 400
    else:
        return jsonify({'error': 'Bad method'}), 400

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