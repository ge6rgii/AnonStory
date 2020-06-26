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
  let form = '<div><input class="form-control" type="text" name="cookie" placeholder="SessionID Cookie"></div><div><input class="form-control" type="text" name="username" placeholder="Username"></div><font color="#C0C0C0" size="1.5px">*Use account\'s session id, which is subscribed on this user</font><font color="#C0C0C0" size="1.5px">*Use account\'s session id, which is subscribed on this user</font>';
  document.getElementById("nav").innerHTML = nav;
  document.getElementById("form").innerHTML = form; 
}

function setHomeActive() {
  let nav = '<nav class="nav nav-masthead justify-content-center"><a class="nav-link active" href="javascript:setHomeActive()">Home</a><a class="nav-link"" href="javascript:setPrivateActive()">Private Acc</a><a class="nav-link" target="_blank" href="https://teleg.run/ge6rgii">Contact</a></nav>'
  let form = '<div id="form" class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">@</span></div><input type="text" class="form-control" name="username" placeholder="username" aria-label="username" aria-describedby="basic-addon1"></div>';
  document.getElementById("nav").innerHTML = nav;
  document.getElementById("form").innerHTML = form;
}
