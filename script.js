let searchButton = document.getElementById('search-btn');
let cityName = document.getElementById('city-name');
let myForm = document.getElementById('my-form');
const api_key = 'f9c255e0762a4864852115628232903';

myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    getTemp(cityName.value);
});


function getTemp(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
    .then(response => response.json())
    .then(response => {
        updateData(response);
    })
    .catch(error => {
        console.error(error);
        alert("INVALID CITY NAME");
    })
}

// Main Update Function
function updateData(data) {
    updateLocation(data["location"]["name"], data["location"]["region"], data["location"]["country"]);
    updateWeatherIcon(data["current"]["condition"]["icon"]);
    updateTemperature(Math.ceil(data["current"]["temp_c"]));
    updateSecondaryValues(
        Math.ceil(data["current"]["feelslike_c"]),
        parseInt(data["current"]["cloud"]),
        Math.ceil(data["current"]["wind_kph"]),
        parseInt(data["current"]["humidity"])
    );
    updateBackground(data["current"]["condition"]["text"]);
}

// Other Update Functions
function updateLocation(name, region, country) {
    let location = name + ', ' + region + ', ' + country;
    document.getElementById('location').innerText = location;
}

function updateWeatherIcon(url) {
    document.getElementById('weather-icon').src = 'https:' + url;
}

function updateTemperature(temperature) {
    document.getElementById('temperature').innerHTML = `${temperature}<sup>°C</sup>`;
}

function updateSecondaryValues(feelsLike, cloudCover, windSpeed, humidity) {
    document.getElementById('feels-like-value').innerText = feelsLike+'°C';
    document.getElementById('cloud-cover-value').innerText = cloudCover+'%';
    document.getElementById('wind-speed-value').innerText = windSpeed+'km/h';
    document.getElementById('humidity-value').innerText = humidity+'%';
}

function updateBackground(text) {
    let background = document.getElementById('bg-video');
    if (text == "Sunny" || text == "Clear") {
        background.src = 'assets/clear-sky.webm';
    }
    else if (text == "Mist" || text == "Partly cloudy" || text == "Fog") {
        background.src = 'assets/mist.webm';
    }
    else if (text == "Cloudy" || text == "Overcast") {
        background.src = 'assets/cloudy.webm';
    }
    else if (text.includes("drizzle") || text.includes("rain")) {
        background.src = 'assets/rain.webm';
    }
}