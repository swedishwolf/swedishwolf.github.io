var frequency;
var myInterval = 0;
var numberSent = 0;
var newNation;
            
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
    sendTgs();
    frequency = 1000 * (parseInt(document.getElementById("interval").value) + 1);
    if (myInterval > 0) clearInerval(myInterval);
    myInterval = setInterval("sendTgs()", frequency);
}
            
function sendTgs() {
    var oldNation = newNation;
    getNewestNation();
    if (oldNation != newNation) {
        document.getElementById("to_box").value = newNation;
        numberSent += 1;
        document.getElementById("submit_button").click();
        document.getElementById("technical_a").innerHTML = "Sending telegrams... " + numberSent + " sent so far";
        document.getElementById("technical_b").innerHTML = "Last telegram sent to: " + newNation;
    } else {
        var frequencySeconds = frequency / 1000;
        document.getElementById("technical_b").innerHTML = "No new nations have been created. Trying again in " + frequencySeconds + " seconds.";
    }
}