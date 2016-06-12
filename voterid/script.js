function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function verify() {
    var nationName = document.getElementById("nation").value;
    var code = document.getElementById("checksum").value;
    var verification = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation=" + nationName + "&checksum=" + code);
    if (verification == 1 || verification == "1") {
        document.getElementById("step_one").innerHTML = "Verification successful.";
        document.getElementById("step_two").style.display = "block";
    } else {
        document.getElementById("step_one").innerHTML = "The verification was unsuccessful. Refresh the page to try again.";
    }
}