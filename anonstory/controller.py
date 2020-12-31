from flask import Flask, jsonify, request
from model import InstaClient
from config import SESSION, USER_AGENT


app = Flask(__name__)
insta_client = InstaClient(SESSION, USER_AGENT)


@app.route('/api/public/<username>', methods=['GET'])
def get_stories_public(username):
    pass


@app.route('/api/private', methods=['POST'])
def get_stories_private():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0')
