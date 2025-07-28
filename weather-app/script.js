// IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
const apiKey = 'YOUR_API_KEY';

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('Vienna');
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;

    weatherDisplay.classList.remove('hidden');
}
