// alerts class name
var divClass = "alert alert-warning alert-dismissible fade show";
var noStories = `<div class="${divClass}"><strong>Ooops!</strong> It seems like there aren't any stories or this account is <a href="javascript:setPrivateActive()" color="black"><font color="#86592d" style="text-decoration: underline;">private</font></a></div>`;
var noStoriesPrivate = `<div class="${divClass}"><strong>Ooops!</strong> It seems like there aren't any stories or session ID is invalid</div>`;


function prepareContentBlock(pics, videos) {
var result = ``;
  for (var i in pics) {
    result = result + `<div class="content"><a href="${pics[i]}" target="_blank"><img height="500px" src="${pics[i]}"></a></div>`;
  }
  for (var i in videos) {
    result = result + `<div class="content"><a href="${videos[i]}" target="_blank"><video height="500px" controls="controls"><source src="${videos[i]}"></video></a></div>`;
  }
  return result;
}


function getLinks(response, username) {
  if (response == 'Wrong username') {
    document.getElementById('posts').innerHTML = `<div class="${divClass}"><strong>${username}</strong> user doesn't exist</div>`;
    document.body.style.height = '100%';
  } else {
    let pics = JSON.parse(response)['pics'];
    let videos = JSON.parse(response)['videos'];
    let contentBlock = prepareContentBlock(pics, videos);
    document.body.style.height = 'auto';
    document.getElementById('posts').innerHTML = contentBlock;
  }
}


function getStoriesPublic(username) {
fetch(`http://127.0.0.1/api/public/${username}`).then(function(response) {
  response.text().then(function(text) {
    let response = text;
    if (response == 'There aren\'t any stories') {
      document.getElementById('posts').innerHTML = noStories;
      document.body.style.height = '100%';
    } else {
      getLinks(response, username);
    }
  });
});
}

function getStoriesPrivate(username, sessionid) {
  const data = {"username": username, "sessionid": sessionid};

  fetch('http://127.0.0.1/api/private', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.text())
  .then(data => {
    let response = data;
    if (response == 'There aren\'t any stories') {
      document.getElementById('posts').innerHTML = noStoriesPrivate;
      document.body.style.height = '100%';
    } else {
      getLinks(response, username);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
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
