function parseResponse(pics) {
  result = ""
  for (var i in pics) {
    result = result + `<div class="content"><a href="${pics[i]} target="_blank"><img height="500px" src="${pics[i]}"></a></div>`;
  }
  document.getElementById('posts').innerHTML = result;
  console.log(result)
}

function getStoriesLinks(username) {
console.log(username);
fetch(`http://127.0.0.1/api/${username}`).then(function(response) {
  response.text().then(function(text) {
    var result = text;
    var pics = JSON.parse(result)['pics'];
    console.log(pics);
    parseResponse(pics);
  });
});
}

function setPrivateActive() {
  document.getElementById('home').classList.remove('active');
  document.getElementById('private').classList.add('active');
  document.getElementById('formHome').style.display = 'none';
  document.getElementById('formPrivate').style.display = '';
}

function setHomeActive() {
  document.getElementById('home').classList.add('active');
  document.getElementById('private').classList.remove('active');
  document.getElementById('formHome').style.display = '';
  document.getElementById('formPrivate').style.display = 'none';
}
