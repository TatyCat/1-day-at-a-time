// Moon API
$(document).ready(function () {
    $.ajax({
        url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        data: {
            product: 'forecast_astronomy',
            name: "'" + currentCity + "'",
            app_id: 'DemoAppId01082013GAL',
            app_code: 'AJKnXv84fjrb0KIHawS0Tg'
        },
        success: function (moonData) {
            document.getElementById("curMoonWatch").innerText = moonData.astronomy.astronomy[0].moonPhaseDesc;
        }
    });
});

name: 'tampa',


"$(document).ready(function () {"
    +"$.ajax({"
        +"url: 'https://weather.cit.api.here.com/weather/1.0/report.json',"
        +"type: 'GET',"
        +"dataType: 'jsonp',"
        +"jsonp: 'jsonpcallback',"
        +"data: {"
        +    "product: 'forecast_astronomy',"
        +    "name: '" + "+ currentCity +"+ "',"
        +    "app_id: 'DemoAppId01082013GAL',"
        +    "app_code: 'AJKnXv84fjrb0KIHawS0Tg'"
        +"},"
        +"success: function (moonData) {"
            "document.getElementById('curMoonWatch').innerText = moonData.astronomy.astronomy[0].moonPhaseDesc;}});});"



// let moonUrl = "https://weather.cit.api.here.com/weather/1.0/report.json";

















//  < script src = "js/script.js" > < /script> moonApiScript