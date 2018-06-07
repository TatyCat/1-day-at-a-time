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
    document.getElementById('welcomeGreeting').style.color = "Cornsilk";
    // document.getElementById('welcomeGreeting').style.color = "white";
}
if ((getTimeOfDay >= 21) && (getTimeOfDay <= 23)) {
    document.getElementById('greetingtimeOfDay').innerText = "Night";
    document.getElementById('welcomeGreeting').style.color = "white";
}


//Display Today's Date
var getTodaysMonth = new Date().getMonth();
var getTodaysDate = new Date().getDate();
var getTodaysDay = new Date().getDay();

var getTodaysYear = new Date().getFullYear();
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('greetingDate').innerText = weekdays[getTodaysDay] + ", " + months[getTodaysMonth] + " " + getTodaysDate + ", " + getTodaysYear;



//--GeoLocation API & Service--
var currentLatLong, currentCity, currentST;
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function showPosition(position) {
    currentLatLong = position.coords.latitude + ',' + position.coords.longitude;

    let reverseGeocodingUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse?' +
        'key=cF2wsQg6dFT47JDxjKUrqkLrAvXIQSEN&location=' + currentLatLong;

    let locationReverseApi = new Request(reverseGeocodingUrl);

    fetch(locationReverseApi)
        .then(function (locationResponse) {
            return locationResponse.json();
        })
        .then(function (locationData) {
            currentCity = locationData.results[0].locations[0].adminArea5.toLowerCase();
            currentST = locationData.results[0].locations[0].adminArea3;
            // currentCity: Pulls CITY then STATE data

            getData(currentCity, currentST);
        });
};

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = '<p class="w3-red">User denied the request for Geolocation.</p>'
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = '<p class="w3-red">Location information is unavailable.</p>'
            break;
        case error.TIMEOUT:
            x.innerHTML = '<p class="w3-red">The request to get user location timed out.</p>'
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = '<p class="w3-red">An unknown error occurred.</p>'
            break;
    }
}


//getData() function uses the geolocation data from the getLocation() function to use in all of the APIs.

function getData(currentCity, currentST) {
    //--Yahoo WEATHER API--
    let wUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + currentCity + "," + currentST + "')&format=json";
    var weatherRequest = new Request(wUrl);

    fetch(weatherRequest)
        .then(function (weatherRequest) {
            return weatherRequest.json();
        })
        .then(function (weatherData) {

            //Yahoo Get Sunrise/Set
            var astronomy = weatherData.query.results.channel.astronomy;
            document.getElementById("displaySunRise").innerText = astronomy.sunrise;
            document.getElementById("displaySunSet").innerText = astronomy.sunset;

            // Yahoo Get Location & Display city
            var item = weatherData.query.results.channel.item;
            document.getElementById('cityLocation').innerText = item.title;


            //Yahoo Get Forcast

            //Current
            var item = weatherData.query.results.channel.item;
            document.getElementById("currentWeatherText").innerText = item.condition.text;
            document.getElementById("currentTemp").innerText = item.condition.temp;

            //For the day
            document.getElementById("highTemp").innerText = weatherData.query.results.channel.item.forecast[0].high;
            document.getElementById("lowTemp").innerText = weatherData.query.results.channel.item.forecast[0].low;
            document.getElementById("forcastText").innerText = weatherData.query.results.channel.item.forecast[0].text;
            document.getElementById("getHumidity").innerText = weatherData.query.results.channel.atmosphere.humidity;

            var wind = weatherData.query.results.channel.wind;
            document.getElementById("windInfo").innerHTML = "Wind Chill: " + wind.chill + "&nbsp; / &nbsp;Wind Speed:  " + wind.speed;
            // }
        });

    //--Severe Weather Alerts API--
    var wAlertUrl = "https://api.weather.gov/alerts/active?point=" + currentLatLong;

    var weatherAlertRequest = new Request(wAlertUrl);
    fetch(weatherAlertRequest)
        .then(function (weatherAlertResponse) {
            return weatherAlertResponse.json();
        })
        .then(function (weatherAlertData) {
            for (var i = 0; i < weatherAlertData.features.length; i++) {
                var alertItem = document.createElement('p');
                document.getElementById('weatherAlertPanel').innerHTML +=
                    '<p class="w3-text-white w3-small w3-panel w3-red w3-round-large w3-section">' +
                    weatherAlertData.features[i].properties.severity +
                    " " +
                    weatherAlertData.features[i].properties.headline +
                    "<br>" +
                    '</p>';
            }
        });



    //--Moon API--
    document.getElementById("moonApiScript").innerHTML =
        "$(document).ready(function () {$.ajax({url: 'https://weather.cit.api.here.com/weather/1.0/report.json',type: 'GET',dataType: 'jsonp',jsonp: 'jsonpcallback',data: {product: 'forecast_astronomy',name: '" + currentCity + "',app_id: 'DemoAppId01082013GAL',app_code: 'AJKnXv84fjrb0KIHawS0Tg'},success: function (moonData) {document.getElementById('curMoonWatch').innerText = moonData.astronomy.astronomy[0].moonPhaseDesc;}});});"
    //The Moon API is located on the html page due to CORS issue. JSONP only works with the 'HERE' API. Script generated in JS file for dynamic city data based on geolocation.



    //--TOP NEWS API--
    let topNewsUrl = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=' + 'c835c5821eec41829538c121edd4e178';

    let newsReq = new Request(topNewsUrl);
    fetch(newsReq)
        .then(function (newsResponse) {
            return newsResponse.json();
        })
        .then(function (newsData) {
            for (let i = 0; i < newsData.totalResults; i++) {
                var createArticleCards = document.createElement('p');
                document.getElementById('topNews').innerHTML += '<div class="w3-card w3-margin">' +
                    '<img src="' + newsData.articles[i].urlToImage + '" class="w3-image w3-margin-top newsPhotos">' +
                    '<div class = "w3-container w3-center"> ' +
                    '<b><p class="w3-small"> ' + newsData.articles[i].title + ' </p></b> ' +
                    '<p class="w3-small"> ' + newsData.articles[i].description + ' </p> ' +
                    '<p><a class="w3-small" target="_blank" href="' + newsData.articles[i].url + '">[Link]</a></p>' +
                    '</div>';
            }
        });
};
