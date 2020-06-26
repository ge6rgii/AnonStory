from flask import Flask, jsonify
import requests
import json


with open('secretkey.json', 'r') as file:
    data = json.load(file)['sessionid']
    data = {'sessionid': data}


app = Flask(__name__)


def get_user_id(username):
    url = 'https://instagram.com/{}'.format(username)
    r = requests.get(url).text
    try:
        result = r.split('profilePage_')[1]
        user_id = result.split('"')[0]
        return user_id
    except:
        return 'Wrong username'


def reverse_instagram(user_id):
    url = 'https://www.instagram.com/graphql/query/?query_hash=ba71ba2fcb5655e7e2f37b05aec0ff98&variables=%7B' \
              '%22reel_ids%22%3A%5B%22{}%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C' \
              '%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22' \
              '%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C' \
              '%22stories_video_dash_manifest%22%3Afalse%7D'.format(user_id)
    r = requests.get(url, cookies=data).text
    return json.loads(r)


def parse_instagram_response(response):
    try:
        links = response['data']['reels_media'][0]['items']
    except IndexError:
        return "There aren't any stories"
    pics = []
    videos = []
    for i in links:
        if i['__typename'] == 'GraphStoryImage':
            pics.append(i['display_url'])
        elif i['__typename'] == 'GraphStoryVideo':
            videos.append(i['video_resources'][0]['src'])
    if len(pics) == 0 and len(videos) == 0:
        return "There aren't any stories"
    result = {'pics': pics, 'videos': videos} 
    return result


@app.route('/api/<username>', methods=['GET'])
def main(username):
    user_id = get_user_id(username)
    if user_id == 'Wrong username':
        pass # pls write some code here
    response = reverse_instagram(user_id)
    stories = parse_instagram_response(response)
    if stories == "There aren't any stories":
        pass # pls write some code here
    return jsonify(stories)


if __name__ == '__main__':
    app.run()
