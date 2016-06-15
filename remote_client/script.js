var numbers = ["a", "b", "c"];
var targets;
var controlName;
var newNation;
var myInterval = 0;
var updated;
var oldNumbers;
var currencyData;

//User Agent Switcher
Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return 'Remote TG API Client - thesolborg.github.io/remote_client'; } });Object.defineProperty(window.navigator, 'vendor', { get: function(){ return ''; } });

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getCommands() {
    var i;
    oldNumbers = numbers;
    controlName = document.getElementById("controller").value;
    var key = document.getElementById("key").value;
    var dataURL = "https://www.nationstates.net/cgi-bin/api.cgi?nation=" + controlName + "&q=motto+currency+animal";
    var allData = httpGet(dataURL);
    var eMottoData = allData.substring(allData.indexOf("<MOTTO>") + 7, allData.indexOf("</MOTTO>"));
    var eAnimalData = allData.substring(allData.indexOf("<ANIMAL>") + 8, allData.indexOf("</ANIMAL>"));
    numbers = [Tea.decrypt(eMottoData, key), Tea.decrypt(eAnimalData, key), allData.substring(allData.indexOf("<CURRENCY>") + 10, allData.indexOf("</CURRENCY>"))];
    for (i = 0; i < numbers.length; i++) {
        if (oldNumbers[i] != numbers[i]) {
            updated = true;
            i = numbers.length;
        } else {
            updated = false;
        }
    }
    currencyData = numbers[2].split(" ");
}

function printOutput(info) {
    document.getElementById("output").innerHTML += Date().substring(0,24) + "&gt; " + info + "<br>";
}

function getNewestNation() {
    var newData = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?q=newnations");
    var begin = newData.indexOf("<NEWNATIONS>") + 12;
    var end = newData.indexOf(",");
    newNation = newData.substring(begin, end);
}

function begin() {
    printOutput("Program has started.");
    cycle();
    document.getElementById("begin_button").style.display = "none";
    if (myInterval > 0) clearInerval(myInterval);
    myInterval = setInterval("cycle()", 185000);
}

function cycle() {
    getCommands();
    var i;
    if (updated === true) {
        i = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?a=sendTG&client=" + numbers[0] + "&tgid=16115961&key=e14658608ced&to=" + controlName);
        printOutput("Change detected - called for confirmation telegram");
        printOutput("Client Key: " + numbers[0] + "; Secret Key: " + numbers[1] + "; TGID: " + currencyData[0] + "; Mode: " + currencyData[1]);
    } else if (currencyData[1] == "on") {
        printOutput("Client is currently enabled.");
        var oldNation = newNation;
        getNewestNation();
        if (oldNation != newNation) {
            i = httpGet("http://www.nationstates.net/cgi-bin/api.cgi?a=sendTG&client=" + numbers[0] + "&tgid=" + currencyData[0] + "&key=" + numbers[1] + "&to=" + newNation);
            printOutput("API called to send telegram to " + newNation);
        }
    } else if (currencyData[1] == "stop") {
        printOutput("Client has been terminated.");
        location.reload();
    } else {
        printOutput("Client has been paused.");
    }
}