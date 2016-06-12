//List of eligible nations:
var nations = ["solborg", "2pacica", "antonoso", "ravenreich", "proutyville"];

var nationTyped;
var valid;

function httpGet(theUrl) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function checkNation() {
    nationTyped = document.getElementById("nation").value;
    if (nations.indexOf(nationTyped.toLowerCase()) < 0) {
        document.getElementById("nation").style.border = "2px solid red";
        alert("Nation not recognized. Telegram Stockgrove if you think this is a mistake.");
        valid = false;
    } else {
        document.getElementById("nation").style.border = "2px solid #888";
        valid = true;
    }
}

function verify() {
    checkNation();
    if (valid === true) {
        var code = document.getElementById("checksum").value;
        var verification = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation=" + nationTyped + "&checksum=" + code);
        if (verification == 1 || verification == "1") {
            document.getElementById("step_one").innerHTML = "Verification successful.";
            document.getElementById("step_two").style.display = "block";
        } else {
            document.getElementById("step_one").innerHTML = "The verification was unsuccessful. Refresh the page to try again.";
        }
    }
}