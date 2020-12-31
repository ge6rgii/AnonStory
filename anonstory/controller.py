from flask import Flask, request
import json
from model import InstaClient
from config import SESSIONID, USER_AGENT


app = Flask(__name__)
instaclient = InstaClient(SESSIONID, USER_AGENT)


@app.route('/api/public/<username>', methods=['GET'])
def get_stories_public(username):
    stories_links = instaclient.get_stories_links(username)
    return stories_links


@app.route('/api/private', methods=['POST'])
def get_stories_private():
    print("**********")
    print(request.data)
    data = json.loads(request.data)
    try:
        sessionid = {"sessionid": str(data["sessionid"])}
        username = str(data["username"])
        stories_links = instaclient.get_stories_links(username, sessionid)
    except KeyError:
        return 'Plase fill out the form'
    return stories_links


if __name__ == '__main__':
    app.run(host='0.0.0.0')
