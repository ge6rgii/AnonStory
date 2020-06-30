// alerts HTML
var divClass = "alert alert-warning alert-dismissible fade show";

function parseResponse(pics, videos) {
var result = ``;
  for (var i in pics) {
    result = result + `<div class="content"><a href="${pics[i]}" target="_blank"><img height="500px" src="${pics[i]}"></a></div>`;
  }
  for (var i in videos) {
    result = result + `<div class="content"><a href="${videos[i]}" target="_blank"><video height="500px" controls="controls"><source src="${videos[i]}"></video></a></div>`;
  }
  return result;
}

function getStoriesLinks(username) {
fetch(`http://127.0.0.1/api/${username}`).then(function(response) {
  response.text().then(function(text) {
    var response = text;
    if (response == 'There aren\'t any posts or account is private') {
      document.getElementById('posts').innerHTML = `<div class="${divClass}"><strong>${username}</strong> user doesn't exist</div>`;
    } else if (response == 'Wrong username') {
      document.getElementById('posts').innerHTML = `<div class="${divClass}"><strong>Ooops!</strong> It seems like there aren't any stories or this account is <a href="javascript:setPrivateActive()" color="black"><font color="#86592d" style="text-decoration: underline;">private</font></a></div>`;
    } else {
      var pics = JSON.parse(response)['pics'];
      var videos = JSON.parse(response)['videos'];
      var responseParsed = parseResponse(pics, videos);
      document.getElementById('posts').innerHTML = responseParsed;
    }
  });
});
}

function setPrivateActive() {
  document.getElementById('posts').innerHTML = '';
  document.getElementById('home').classList.remove('active');
  document.getElementById('private').classList.add('active');
  document.getElementById('formHome').style.display = 'none';
  document.getElementById('formPrivate').style.display = '';
}

function setHomeActive() {
  document.getElementById('posts').innerHTML = '';
  document.getElementById('home').classList.add('active');
  document.getElementById('private').classList.remove('active');
  document.getElementById('formHome').style.display = '';
  document.getElementById('formPrivate').style.display = 'none';
}
