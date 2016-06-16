var votes = {};
var seats = {};
var remainders = {};
var parties = ["pi", "g", "soc", "pr", "l", "sol"];
var sorted;
var listSeats = {"pi": 0, "g": 0, "soc": 0, "pr": 0, "l": 0, "sol": 0};

function getInputs() {
    votes = {"pi": parseInt(document.getElementById("pi_votes").value),
        "g": parseInt(document.getElementById("g_votes").value),
        "soc": parseInt(document.getElementById("soc_votes").value),
        "pr": parseInt(document.getElementById("pr_votes").value),
        "l": parseInt(document.getElementById("l_votes").value),
        "sol": parseInt(document.getElementById("sol_votes").value)};
    seats = {"pi": parseInt(document.getElementById("pi_seats").value),
        "g": parseInt(document.getElementById("g_seats").value),
        "soc": parseInt(document.getElementById("soc_seats").value),
        "pr": parseInt(document.getElementById("pr_seats").value),
        "l": parseInt(document.getElementById("l_seats").value),
        "sol": parseInt(document.getElementById("sol_seats").value)};
}

function sortRems() {sorted = Object.keys(remainders).sort(function(a, b) {return remainders[a] - remainders[b]})}

function calculate() {
    var i;
    var x;
    var aSD;
    var bSD;
    getInputs();
    var quota = (votes.pi + votes.g + votes.soc + votes.pr + votes.l + votes.sol) / 159;
    for (aSD = 0, bSD = 0; bSD < 80; bSD += aSD) {
        aSD = 0;
        for (i = 0; i < 6; i ++) remainders[parties[i]] = (Math.round(votes[parties[i]] * 100) / 100) / quota - (seats[parties[i]] + listSeats[parties[i]]);
        sortRems();
        if (remainders[sorted[0]] > 0) {
            listSeats[sorted[0]] += 1;
            aSD ++;
        }
        if (remainders[sorted[1]] > 0) {
            listSeats[sorted[1]] += 1;
            aSD ++;
        }
        if (remainders[sorted[2]] > 0) {
            listSeats[sorted[2]] += 1;
            aSD ++;
        }
        if (remainders[sorted[3]] > 0) {
            listSeats[sorted[3]] += 1;
            aSD ++;
        }
        if (remainders[sorted[4]] > 0) {
            listSeats[sorted[4]] += 1;
            aSD ++;
        }
        if (remainders[sorted[5]] > 0) {
            listSeats[sorted[5]] += 1;
            aSD ++;
        }
    }
    displayResults();
}

function displayResults() {
    document.getElementById("b2").innerHTML = votes.pi;
    document.getElementById("c2").innerHTML = votes.g;
    document.getElementById("d2").innerHTML = votes.soc;
    document.getElementById("e2").innerHTML = votes.pr;
    document.getElementById("f2").innerHTML = votes.l;
    document.getElementById("g2").innerHTML = votes.sol;
    
    document.getElementById("b3").innerHTML = seats.pi;
    document.getElementById("c3").innerHTML = seats.g;
    document.getElementById("d3").innerHTML = seats.soc;
    document.getElementById("e3").innerHTML = seats.pr;
    document.getElementById("f3").innerHTML = seats.l;
    document.getElementById("g3").innerHTML = seats.sol;
    
    document.getElementById("b4").innerHTML = listSeats.pi;
    document.getElementById("c4").innerHTML = listSeats.g;
    document.getElementById("d4").innerHTML = listSeats.soc;
    document.getElementById("e4").innerHTML = listSeats.pr;
    document.getElementById("f4").innerHTML = listSeats.l;
    document.getElementById("g4").innerHTML = listSeats.sol;
    
    document.getElementById("b5").innerHTML = seats.pi + listSeats.pi;
    document.getElementById("c5").innerHTML = seats.g + listSeats.g;
    document.getElementById("d5").innerHTML = seats.soc + listSeats.soc;
    document.getElementById("e5").innerHTML = seats.pr + listSeats.pr;
    document.getElementById("f5").innerHTML = seats.l + listSeats.l;
    document.getElementById("g5").innerHTML = seats.sol + listSeats.sol;
}