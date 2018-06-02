
// DOM Edits

// Greeting by time of day
let getTimeOfDay = new Date().getHours();

if ((getTimeOfDay >= 0) && (getTimeOfDay <= 11)) {
    document.getElementById('greetingtimeOfDay').innerText = "Morning";
    document.getElementById('welcomeGreeting').style.color = "gold";
}

if ((getTimeOfDay >= 12) && (getTimeOfDay <= 16)) {
    document.getElementById('greetingtimeOfDay').innerText = "Afternoon";
    document.getElementById('welcomeGreeting').style.color = "gold";
}

if ((getTimeOfDay >= 17) && (getTimeOfDay <= 20)) {
    document.getElementById('greetingtimeOfDay').innerText = "Evening";
    document.getElementById('welcomeGreeting').style.color = "black";
}
if ((getTimeOfDay >= 21) && (getTimeOfDay <= 23)) {
    document.getElementById('greetingtimeOfDay').innerText = "Night";
    document.getElementById('welcomeGreeting').style.color = "darkblue";
}


//Display Today's Date
let getTodaysMonth = new Date().getMonth();
let getTodaysDay = new Date().getDate();
var getTodaysYear = new Date().getFullYear();

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('greetingDate').innerText = months[getTodaysMonth] + " " + getTodaysDay + ", " + getTodaysYear;



//Get Location & Display city

document.getElementById('cityLocation').innerText = "Tampa, FL";
document.getElementById('cityLocation').style.color = "gold";

// Weather - TEMP
document.getElementById("highTemp").innerText = 85;
document.getElementById("lowTemp").innerText = 75;

//weather Alert Panel *if Statement*
document.getElementById('weatherAlertPanel').className = "w3-text-white ";
document.getElementById("weatherAlertPanel").className += " w3-panel w3-red w3-round-large ";



//Top News
// document.getElementById("topNew").innerHTML = 












