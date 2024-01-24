const apiKey = '0a6456e38ba6968f9d2a83afbff752b7';
const FIVE_MINUTES = 5 * 60 * 1000;

function getCityName() {
    return document.getElementById('cityName').value;
}


async function cacheWeatherData(cityName, data) {
    const cache = await caches.open('weatherData');
    const cacheData = {
        timestamp: Date.now(),
        data: data
    };
    await cache.put(cityName, new Response(JSON.stringify(cacheData)));
}


async function getWeatherDataFromCache(cityName) {
    const cache = await caches.open('weatherData');
    const cachedResponse = await cache.match(cityName);
    if (cachedResponse) {
        const cacheData = await cachedResponse.json();
        const cacheAge = Date.now() - cacheData.timestamp;

        if (cacheAge < FIVE_MINUTES) { 
            return cacheData.data;
        }
    }
    return null;
}


async function getWeather(city, apiKeyWeather) {
    const cachedWeatherData = await getWeatherDataFromCache(city);
    if(cachedWeatherData) {
        return cachedWeatherData;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`);
    if (!response.ok){
        alert(`Problem z pobraniem pogody dla ${city}`)
    }
    const data = await response.json();
    cacheWeatherData(city, data);
    return data;
}

function displayWeather(weatherData) {
    const weather = document.getElementById('weather');
    weather.innerHTML = `
        <h1>${weatherData.name}</h1>
        <img class="weather-icon" src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png">
        <h3 class="important-info text">${weatherData.weather[0].description}</h3>
        <h1 class="temp-info">${weatherData.main.temp}°C</h1>
        <p>Wilgotność: ${weatherData.main.humidity}%</p>
        <p>Wiatr: ${weatherData.wind.speed} km/h</p>
    `;
}

async function updateWeather(cityName) {
    const weather = await getWeather(cityName, apiKey);
    displayWeather(weather);
}
const searchButton = document.getElementById('searchButton');

async function onSearchButtonClick() {
    await updateWeather(getCityName());
    let avalaibleCityNames = getCitiesFromLocalStorage();
    const currentCityName = getCityName();
    if(!avalaibleCityNames.includes(currentCityName) || avalaibleCityNames.length == 0){
        avalaibleCityNames.push(currentCityName);
        localStorage.setItem('cityNames', avalaibleCityNames);
    }
    updateCitiesMenu();
    document.getElementById('cityName').value = '';
}

searchButton.addEventListener('click', onSearchButtonClick);

//przycisk usuń ostatnie miasto
function removeLastCity() {
    let cities = getCitiesFromLocalStorage();
    cities.pop();
    if(cities.length == 0){
        localStorage.clear();
    } else {
        localStorage.setItem('cityNames', cities);
    }
}

document.getElementById('removeCity').addEventListener('click', function() {
    removeLastCity();
    updateCitiesMenu();
});


function getCitiesFromLocalStorage() {
    const cities = localStorage.getItem('cityNames');
    if(cities){
        return localStorage.getItem('cityNames').split(',');
    } else {
        return [];
    }    
}

function updateCitiesMenu() {
    let menu = '';
    let cities = getCitiesFromLocalStorage();
    cities.forEach(cityName => {
        menu += `<a id='${cityName}' href='#'>${cityName}</a>`;
    });
    document.getElementById('cities').innerHTML = `${menu}`;
    cities.forEach(cityId => {
        document.getElementById(cityId).addEventListener('click', async () => {
            await updateWeather(cityId);
            localStorage.setItem('currentCity', cityId);
        });
    })
}


updateCitiesMenu();
const cities = getCitiesFromLocalStorage();
if(cities.length !== 0){
    const currentCity = localStorage.getItem('currentCity');
    updateWeather(currentCity);
}

setInterval(()=>{
    const currentCity = localStorage.getItem('currentCity');
    updateWeather(currentCity);
}, FIVE_MINUTES);


setInterval(() =>{
    if(getCitiesFromLocalStorage().length >= 10){
        document.getElementById('cityName').disabled = true;
        document.getElementById('searchButton').disabled = true;
    } else {
        document.getElementById('cityName').disabled = false;
        document.getElementById('searchButton').disabled = false;
    }
}, 50);

