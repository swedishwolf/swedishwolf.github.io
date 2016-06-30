var frequency;
var myInterval = 0;
var numberSent = 0;
var newNation;
var mode;
var targets;
var tgLimit;

//User Agent Switcher
Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return 'TG API Client - thesolborg.github.io'; } });Object.defineProperty(window.navigator, 'vendor', { get: function(){ return ''; } });

function newRecruits() {
    mode = "new";
    document.getElementById("modes").innerHTML = "Mode: Automatically Recruit New Nations";
    document.getElementById("parameters").style.display = "block";
    document.getElementById("recipients").style.display = "none";
    document.getElementById("interval").value = "180";
}

function listTargets() {
    mode = "manual";
    document.getElementById("modes").innerHTML = "Mode: Manually List Target Nations";
    document.getElementById("parameters").style.display = "block";
    document.getElementById("limit").style.display = "none";
    document.getElementById("interval").value = "30";
}

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getNewestNation() {
    var newData = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?q=newnations");
    var begin = newData.indexOf("<NEWNATIONS>") + 12;
    var end = newData.indexOf(",");
    newNation = newData.substring(begin, end);
}

function startTimer() {
    if (mode == "manual") {
        targets = document.getElementById("recipient_box").value.split(",");
    }
    if (document.getElementById("limit_box").value !== "") {
        tgLimit = parseInt(document.getElementById("limit_box").value);
    } else {
        tgLimit = 999999999;
    }
    sendTgs();
    frequency = 1000 * (parseInt(document.getElementById("interval").value) + 1);
    if (myInterval > 0) clearInerval(myInterval);
    myInterval = setInterval("sendTgs()", frequency);
}

function sendTgs() {
    if (mode == "new") {
        var oldNation = newNation;
        getNewestNation();
        if (oldNation != newNation && numberSent < tgLimit) {
            numberSent += 1;
            document.getElementById("to_box").value = newNation;
            document.getElementById("submit_button").click();
            document.getElementById("technical_a").innerHTML = "Sending telegrams... " + numberSent + " sent so far";
            document.getElementById("technical_b").innerHTML = "Last telegram sent to: " + newNation;
            console.log("API called to send telegram to " + newNation);
        } else if (oldNation == newNation && numberSent < tgLimit) {
            var frequencySeconds = frequency / 1000;
            document.getElementById("technical_b").innerHTML = "No new nations have been created. Trying again in " + frequencySeconds + " seconds.";
            console.log("No new nations have been created. Trying again in " + frequencySeconds + " seconds.");
        } else {
            document.getElementById("technical_b").innerHTML = "Finished sending telegrams.";
            myInterval = 1;
            console.log("Finished.");
        }
    } else {
        if (numberSent < targets.length) {
            var displayNum = numberSent + 1;
            document.getElementById("to_box").value = targets[numberSent];
            document.getElementById("technical_a").innerHTML = "Sending telegrams... " + displayNum + " sent so far";
            document.getElementById("technical_b").innerHTML = "Last telegram sent to: " + targets[numberSent];
            console.log("API called to send telegram to " + targets[numberSent]);
            numberSent += 1;
            document.getElementById("submit_button").click();
        } else {
            document.getElementById("technical_b").innerHTML = "Finished sending telegrams.";
            myInterval = 1;
            console.log("Finished.");
        }
    }
}