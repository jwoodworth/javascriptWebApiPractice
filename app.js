/*global document, window, alert, console, require*/

function get_Weather() {
    'use strict';
    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%20in%20(%22chicago%2C%20il%22%2C%20%22minneapolis%2C%20mn%22%2C%20%22auburndale%2C%20fl%22))&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (jd) {
        console.log("Test get WEather");
        console.log(jd);
        var s1 = jd.query.results;
        var channel, cardtext;
        var get_GeoLoc;
        /*
        // Begin accessing JSON data here
        //Object.keys(a).forEach(function (key){
        jd.forEach( channel in results) {
            card = document.createElement('div');
            card.setAttribute('class', 'card');

            h1 = document.createElement('h1');
            h1.textContent = desc.title;

            p = document.createElement('p');
            cardtext = "Temp: " + "\t" + item.condition.temp + "\n" + "Condition: " + "\t" + "item.condition.text"
                ""
            p.textContent = `${cardtext}`;            
                        
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        });
    */        
        var desc0 = s1.channel[0].description;
        var temp0 = s1.channel[0].item.condition.temp;
        var text0 = s1.channel[0].item.condition.text;
        $('#card00h').text(desc0);
        $('#card00a').text("Temperature: " + temp0);
        $('#card00b').text("Condition: " + text0);
              
        var desc1 = s1.channel[1].description;
        var temp1 = s1.channel[1].item.condition.temp;
        var text1 = s1.channel[1].item.condition.text;
        $('#card01h').text(desc1);
        $('#card01a').text("Temperature: " + temp1);
        $('#card01b').text("Condition: " + text1);

        var desc2 = s1.channel[2].description;
        var temp2 = s1.channel[2].item.condition.temp;
        var text2 = s1.channel[2].item.condition.text;
        $('#card02h').text(desc2);
        $('#card02a').text("Temperature: " + temp2);
        $('#card02b').text("Condition: " + text2);
    });
}

var latitude, longitude;
function geoFindMe() {
    var output = document.getElementById("out");
    console.log("Test GeoFindMe");
    
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + 
            longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    
    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
}