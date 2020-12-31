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

    def _parse_server_response(self):
        pass

    def get_stories_links(self):
        pass
