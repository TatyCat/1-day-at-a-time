
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
var getTodaysMonth = new Date().getMonth();
var getTodaysDate = new Date().getDate();
var getTodaysDay = new Date().getDay();

var getTodaysYear = new Date().getFullYear();
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('greetingDate').innerText = weekdays[getTodaysDay] + ", " + months[getTodaysMonth] + " " + getTodaysDate + ", " + getTodaysYear;




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



//--Weather Alerts API--
var wUrl = "https://api.weather.gov/alerts/active?zone=FLC057";
// var wurl = "https://api.weather.gov/alerts/active?";
// var wurl = "https://api.weather.gov/alerts/active?point=28.030671,-82.407953";

var weatherRequest = new Request(wUrl);
fetch(weatherRequest)
    .then(function (weatherResponse) {
        return weatherResponse.json();
    })
    .then(function (weatherData) {
        for (var i = 0; i <= weatherData.features.length; i++) {
            var alertItem = document.createElement('p');
            document.getElementById('weatherAlertPanel').innerHTML += 
            '<p class="w3-text-white w3-small w3-panel w3-red w3-round-large w3-section">'  
            + weatherData.features[i].properties.severity
            + " " 
            + weatherData.features[i].properties.headline
            + "<br>" 
            + '</p>';
        }
    });



//--Moon API--
var moonUrl = "http://api.usno.navy.mil/rstt/oneday?date=6/3/2018&loc=Tampa,%20FL";
var moonReq = new Request(moonUrl);
fetch(moonReq)
    .then(function (moonResponse) {
        return moonResponse.json();
    })
    .then(function (moonData) {
        document.getElementById('moonWatch').innerHTML= 
            '<p class="w3-card w3-margin w3-container w3-white w3-center">'
            + "Current Phase: "
            + moonData.curphase
            + '<br>'
            + "Next Phase: "
            + moonData.closestphase.phase
            + " on "
            + moonData.closestphase.date
            + '</p>'; 
    });



//--TOP NEWS API--
let topNewsUrl = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=c835c5821eec41829538c121edd4e178';

let newsReq = new Request(topNewsUrl);
fetch(newsReq)
    .then(function (newsResponse) {
    return newsResponse.json();
    })
    .then(function (newsData) {
        for (let i = 0; i < newsData.totalResults; i++) {
            var createArticleCards = document.createElement('p');
            document.getElementById('topNews').innerHTML += '<div class = "w3-card w3-margin"> '
            +'<img src="' + newsData.articles[i].urlToImage + '" class="w3-image" style="max-width:77%">'
            + '<div class = "w3-container w3-center"> '
            +'<b><p class="w3-small"> ' + newsData.articles[i].title + ' </p></b> '
            +'<p class="w3-small"> ' + newsData.articles[i].description + ' </p> '
            +'<p><a class="w3-small" target="_blank" href="' + newsData.articles[i].url + '">[Link]</a></p>'
            +'</div>';
        }
    });