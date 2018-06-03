
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



//--Moon & Weather Alerts API--
var weatherAlertApiUrl = "https://weather.api.here.com/weather/1.0/report.json?product=alerts&name=Tampa&app_id=s5F32OuAH5OYhnZZe38j&app_code=i1WL33DXkJCu-OAySmV2CQ&format=json%22";
var weatherAlertApiUrl2 = "https://weather.cit.api.here.com/weather/1.0/report.json?product=alerts&name=Tampa&app_id=s5F32OuAH5OYhnZZe38j&app_code=i1WL33DXkJCu-OAySmV2CQ&format=json%22";
var urlExample = "https://weather.cit.api.here.com/weather/1.0/report.json?product=alerts&name=Chicago&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg";

// var myList = document.querySelector('ul');
// var myRequest = new Request(weatherAlertApiUrl);

// fetch(myRequest)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         for (var i = 0; i < 2; i++) {
//             var listItem = document.createElement('li');
//             listItem.innerHTML = data.alerts.country;
//             myList.appendChild(listItem);
//         }
//     });







// var ready = function () {
//     $.ajax({
//         url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
//         type: 'GET',
//         dataType: 'jsonp',
//         jsonp: 'jsonpcallback',
//         data: {
//             product: 'alerts',
//             name: 'Chicago',
//             app_id: 's5F32OuAH5OYhnZZe38j',
//             app_code: 'i1WL33DXkJCu-OAySmV2CQ'
//         },
//         success: function (data) {
//             console.log(JSON.stringify(data));
//         }
//     });
// }






/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Severe Weather Alert API
var weatherAlertApiUrl =

var weatherAlertReq = new Request(weatherAlertApiUrl);
fetch(weatherAlertReq)
    .then(function (weatherAlertResponse) {
        return weatherAlertResponse.json();
    })
    .then(function (weatherAlertData) {
        document.getElementById('weatherAlertPanel').innerText = weatherAlertData.alerts.country;
  });

//Weather Alert Styling *if Statement*
document.getElementById('weatherAlertPanel').className = "w3-text-white w3-panel w3-red w3-round-large ";
*/

// Moon API
// var moonApiUrl = 'https://weather.api.here.com/weather/1.0/report.json?product=alerts&name=Tampa&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';


/*

var moonReq = new Request(moonApiUrl);
fetch(moonReq)
    .then(function (moonResponse) {
        return moonResponse.json();
    })
    .then(function (moonData) {
        document.getElementById('moonWatch').innerText = moonData.alerts.country;
    });
*/









//--TOP NEWS API--
var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=c835c5821eec41829538c121edd4e178';


var req = new Request(url);
fetch(req)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.totalResults; i++) {
            var createArticleCards = document.createElement('p');
            document.getElementById('topNews').innerHTML += '<div id = "topNews" class = "w3-card w3-margin"> '
            +'<img src="' + data.articles[i].urlToImage + '" class="w3-image">'
            + '<div class = "w3-container w3-center"> '
            +'<b><p class="w3-small"> ' + data.articles[i].title + ' </p></b> '
            +'<p class="w3-small"> ' + data.articles[i].description + ' </p> '
            +'<p><a class="w3-small" target="_blank" href="' + data.articles[i].url + '">[Link]</a></p>'
            +'</div>';
        }
    });
