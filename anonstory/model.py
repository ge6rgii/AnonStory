import requests


class InstaClient:

    def __init__(self, sessionid, user_agent):
        self.sessionid = sessionid
        self.user_agent = user_agent
        self.url = 'https://instagram.com'

    def _get_user_id(self, username: str) -> str:
        uri = f'{self.url}/web/search/topsearch/?context=blended&query={username}'
        user_data = requests.get(uri, headers=self.user_agent, cookies=self.sessionid).json()
        
        try:
            user_id = user_data["users"][0]["user"]["pk"]
        except IndexError:
            return ''
        
        return user_id
    
    def _get_raw_account_data(self, username:str, sessionid: dict) -> dict:
        user_id = self._get_user_id(username)
        if not user_id:
            return {}
        url = f'{self.url}/graphql/query/?query_hash=ba71ba2fcb5655e7e2f37b05aec0ff98&variables=%7B' \
              f'%22reel_ids%22%3A%5B%22{user_id}%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C' \
               '%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22' \
               '%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C' \
               '%22stories_video_dash_manifest%22%3Afalse%7D'
        raw_account_data = requests.get(url, headers=self.user_agent, cookies=sessionid).json()
        return raw_account_data

    def get_stories_links(self, username, sessionid=None):
        if not sessionid:
            sessionid = self.sessionid
            
        raw_account_data = self._get_raw_account_data(username, sessionid)
        if not raw_account_data:
            return 'Wrong username'
        try:
            links = raw_account_data["data"]["reels_media"][0]["items"]
        except IndexError:
            return 'There aren\'t any stories'

        pics = []
        videos = []
        for i in links:
            if i["__typename"] == 'GraphStoryImage':
                pics.append(i["display_url"])
            elif i["__typename"] == 'GraphStoryVideo':
                videos.append(i["video_resources"][0]["src"])

        if not pics and not videos:
            return 'There aren\'t any stories'

        result = {"pics": pics, "videos": videos}
        return result
