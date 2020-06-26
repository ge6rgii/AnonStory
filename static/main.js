function parseResponse(pics) {
  result = ""
  for (var i in pics) {
    result = result + '<img width="450" src=' + pics[i] + '>';
  }
  document.getElementById("posts").innerHTML = result
}

function getStoriesLinks() {
fetch('http://127.0.0.1/api/vakhrushevdrift').then(function(response) {
  response.text().then(function(text) {
    var result = text;
    var pics = JSON.parse(result)['pics'];
    console.log(pics);
    parseResponse(pics);
  });
});
}

function setPrivateActive() {
  let nav = '<nav class="nav nav-masthead justify-content-center"><a class="nav-link" href="javascript:setHomeActive()">Home</a><a class="nav-link active" href="javascript:setPrivateActive()">Private Acc</a><a class="nav-link" target="_blank" href="https://teleg.run/ge6rgii">Contact</a></nav>'
  let sessionIdInput = '';
  document.getElementById("nav").innerHTML = nav;
  document.getElementById("sessionid").innerHTML = sessionIdInput;
}

function setHomeActive() {
  let nav = '<nav class="nav nav-masthead justify-content-center"><a class="nav-link active" href="javascript:setHomeActive()">Home</a><a class="nav-link"" href="javascript:setPrivateActive()">Private Acc</a><a class="nav-link" target="_blank" href="https://teleg.run/ge6rgii">Contact</a></nav>'
  document.getElementById("nav").innerHTML = nav;
}
