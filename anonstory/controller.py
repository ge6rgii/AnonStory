from flask import Flask, request
import json
from model import InstaClient
from config import SESSIONID, USER_AGENT
import logging


app = Flask(__name__)
instaclient = InstaClient(SESSIONID, USER_AGENT)
logging.basicConfig(filename='log')


@app.route('/api/public/<username>', methods=['GET'])
def get_stories_public(username):
    logging.info(username)
    stories_links = instaclient.get_stories_links(username)
    return stories_links


@app.route('/api/private', methods=['POST'])
def get_stories_private():
    data = json.loads(request.data)
    try:
        sessionid = {"sessionid": str(data["sessionid"])}
        username = str(data["username"])
    except KeyError:
        return 'Plase fill out the form'

    logging.info(username)
    stories_links = instaclient.get_stories_links(username, sessionid)
    
    return stories_links


if __name__ == '__main__':
    app.run(host='0.0.0.0')
