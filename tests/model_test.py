import pytest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from anonstory.model import InstaClient
from anonstory.config import SESSIONID, USER_AGENT


instaclient = InstaClient(sessionid, user_agent)


@pytest.mark.parametrize('username, expected', [
    ('tihomeowrov', '8359076794'),
    ('ge6rgii',     '15020362'),
    ('ge6rgiiiii',  '')
])
def test_get_user_id(username, expected):
    user_id = instaclient._get_user_id(username)
    assert user_id == expected
