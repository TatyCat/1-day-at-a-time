
// DOM Edits / JS

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
    document.getElementById('welcomeGreeting').style.color = "gold";
}
if ((getTimeOfDay >= 21) && (getTimeOfDay <= 23)) {
    document.getElementById('greetingtimeOfDay').innerText = "Night";
    document.getElementById('welcomeGreeting').style.color = "darkblue";
}


//Display Today's Date
let getTodaysMonth = new Date().getMonth();
let getTodaysDate = new Date().getDate();
let getTodaysDay = new Date().getDay();

var getTodaysYear = new Date().getFullYear();
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('greetingDate').innerText = weekdays[getTodaysDay] + ", " + months[getTodaysMonth] + " " + getTodaysDate + ", " + getTodaysYear;


//weather Alert Panel *if Statement*
document.getElementById('weatherAlertPanel').className = "w3-text-white w3-panel w3-red w3-round-large ";




//Top News
// document.getElementById("topNew").innerHTML = 

// document.getElementById('').style.color = "gold";

//--Yahoo WEATHER API--

var callbackFunction = function (data) {
    //Yahoo Get Sunrise/Set
    var astronomy = data.query.results.channel.astronomy;
    document.getElementById("displaySunRise").innerText = astronomy.sunrise;
    document.getElementById("displaySunSet").innerText = astronomy.sunset;

    //Yahoo Get Location & Display city
    var item = data.query.results.channel.item;
    document.getElementById('cityLocation').innerText = item.title;
    

    //Yahoo Get Forcast

    //Current
    var item = data.query.results.channel.item;
    document.getElementById("currentWeatherText").innerText = item.condition.text;
    document.getElementById("currentTemp").innerText = item.condition.temp;
    


    //For the day
    document.getElementById("highTemp").innerText = data.query.results.channel.item.forecast[0].high;
    document.getElementById("lowTemp").innerText = data.query.results.channel.item.forecast[0].low;

    document.getElementById("forcastText").innerText = data.query.results.channel.item.forecast[0].text;

    document.getElementById("getHumidity").innerText = data.query.results.channel.atmosphere.humidity;

    var wind = data.query.results.channel.wind;
    document.getElementById("windInfo").innerHTML = "Wind Chill: " + wind.chill + "&nbsp; / &nbsp;Wind Speed:  " + wind.speed;

};




//--Moon API--




//--TOP NEWS API--
var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=c835c5821eec41829538c121edd4e178';
var req = new Request(url);
fetch(req)
    .then(function (response) {
        console.log(response.json());

        let articles = response.articles;
        for (var i = 0; i < articles.totalResults; i++) {
            document.getElementById("topNews").innerHTML =
            // '<p class = "w3-section w3-container w3-card w3-dark-grey w3-cell w3-mobile w3-col m8">' +
            '<p>' + articles[i].title + '</p>';
            // +articles.title + <br>
            // +articles.description + <br>
            // +articles.urlToImage + <br>
            // +articles.url
            // + '</p>';
        };
    })

    
