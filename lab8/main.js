const apiKey = '5134d627e2df6937d6d89fcd761a4817';


function getCityName() {
    return document.getElementById('cityName').value;
}

async function getWeather(city, apiKeyWeather) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`);
    if (!response.ok) throw new Error('Problem z pobraniem danych pogodowych');
    const data = await response.json();
    return data
}

document.getElementById('searchButton').addEventListener('click', ()=>{
    console.log(getCityName());
    console.log(getWeather('warsaw', apiKey));
});