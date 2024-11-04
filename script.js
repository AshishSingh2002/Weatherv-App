const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


const API_KEY = "8506b69f2b0e44acb7181038240411";

function getWeatherImage(code) {
    if (code === 1000) {
        return "/assets/clear.png";
    } else if (code >= 1003 && code <= 1009) {
        return "/assets/cloud.png";
    } else if (
        (code >= 1063 && code <= 1072) ||
        (code >= 1150 && code <= 1201) ||
        (code >= 1240 && code <= 1246)
    ) {
        return "/assets/rain.png";
    } else if (
        (code >= 1204 && code <= 1237) ||
        (code >= 1261 && code <= 1264)
    ) {
        return "/assets/snow.png";
    } else {
        return "/assets/cloud.png";
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Hide error message and show weather info
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Update temperature
        temperature.innerHTML = `${Math.round(data.current.temp_c)}<sup>°C</sup>`;

        // Update weather description
        description.innerHTML = data.current.condition.text;

        // Update humidity
        humidity.innerHTML = `${data.current.humidity}%`;

        // Update wind speed
        wind_speed.innerHTML = `${Math.round(data.current.wind_kph)}Km/H`;

        // Update weather image
        weather_img.src = getWeatherImage(data.current.condition.code);

    } catch (error) {
        console.error("Error fetching weather:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    if (inputBox.value.trim()) {
        checkWeather(inputBox.value);
    }
});

// Event listener for Enter key
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputBox.value.trim()) {
        checkWeather(inputBox.value);
    }
});

// Initially hide the weather body until search
weather_body.style.display = "none";