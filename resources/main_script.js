function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var postID = getParameterByName("post");
var postIntro = document.getElementById("post_intro");
var postContent = document.getElementById("post_content");

if (postID === null) {
    postID = "0001";
    postIntro.innerHTML = 'The most recent post is shown below. Click <a href="#" onclick="showList()">here</a> to browse through all posts.';
} else {
    postIntro.innerHTML = "Post number " + postID + ' is shown below. Click <a href="#" onclick="showList()">here</a> to browse through all posts.';
}
postContent.innerHTML = httpGet("posts/" + postID + ".html");

function showList() {
    postIntro.innerHTML = "";
    postContent.innerHTML = httpGet("resources/post_list.html");
}