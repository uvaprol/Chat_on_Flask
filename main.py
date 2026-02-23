from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import json
from datetime import datetime


app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    return jsonify({
        'status': 'success',
        'message': 'Data received'
    }), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'status': 'alive'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)



