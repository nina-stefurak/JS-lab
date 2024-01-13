const apiKey = '5134d627e2df6937d6d89fcd761a4817';

function getCityName() {
    return document.getElementById('cityName').value;
}

async function getWeather(city, apiKeyWeather) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`);
    if (!response.ok){
        alert(`Problem z pobraniem pogody dla ${city}`)
    }
    const data = await response.json();
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

document.getElementById('searchButton').addEventListener('click', async ()=>{
    await updateWeather(getCityName());
    let avalaibleCityNames = localStorage.getItem('cityNames');
    let newCityNames = `${avalaibleCityNames},${getCityName()}`;
    localStorage.setItem('cityNames', newCityNames);
    await updateWeather(getCityName());
    updateCitiesMenu();
});

//przycisk usuń ostatnie miasto
// function removeLastCity() {
//     // 
// }

// document.getElementById('removeCity').addEventListener('click', function() {
//     removeLastCity();
// });


function getCitiesFromLocalStorage() {
    return localStorage.getItem('cityNames').split(',');
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
        });
    })
}

//dodać if do citiesMenu, żeby uniknąć powtórzenia 

updateCitiesMenu();
const firstCity = getCitiesFromLocalStorage()[0];
updateWeather(firstCity);

