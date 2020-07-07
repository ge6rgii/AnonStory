// alerts class name
var divClass = "alert alert-warning alert-dismissible fade show";
var noStories = `<div class="${divClass}"><strong>Ooops!</strong> It seems like there aren't any stories or this account is <a href="javascript:setPrivateActive()" color="black"><font color="#86592d" style="text-decoration: underline;">private</font></a></div>`;

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

function getStoriesLinks(requestType, username) {
fetch(`http://127.0.0.1/api/${requestType}/${username}`).then(function(response) {
  response.text().then(function(text) {
    var response = text;
    if (response == 'Wrong username') {
      document.getElementById('posts').innerHTML = `<div class="${divClass}"><strong>${username}</strong> user doesn't exist</div>`;
      document.body.style.height = '100%';
    } else if (response == 'There aren\'t any stories') {
      document.getElementById('posts').innerHTML = noStories;
      document.body.style.height = '100%';
    } else {
      var pics = JSON.parse(response)['pics'];
      var videos = JSON.parse(response)['videos'];
      var responseParsed = parseResponse(pics, videos);
      document.body.style.height = 'auto';
      document.getElementById('posts').innerHTML = responseParsed;
    }
  });
});
}

function setPrivateActive() {
  document.body.style.height = '100%';
  document.getElementById('posts').innerHTML = '';
  document.getElementById('home').classList.remove('active');
  document.getElementById('private').classList.add('active');
  document.getElementById('formHome').style.display = 'none';
  document.getElementById('formPrivate').style.display = '';
}

function setHomeActive() {
  document.body.style.height = '100%';
  document.getElementById('posts').innerHTML = '';
  document.getElementById('home').classList.add('active');
  document.getElementById('private').classList.remove('active');
  document.getElementById('formHome').style.display = '';
  document.getElementById('formPrivate').style.display = 'none';
}
