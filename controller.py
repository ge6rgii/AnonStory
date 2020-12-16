from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route('/api/public/<username>', methods=['GET'])
def get_stories_public(username):
    pass


@app.route('/api/private', methods=['POST'])
def get_stories_private():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0')
