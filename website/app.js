// Get selectors
const button = document.querySelector('button');
const tempContent = document.querySelector('.temperature-text');
const mainContent = document.querySelector('.main-text');
const feelingContent = document.querySelector('.feeling-text');
const dateContent = document.querySelector('.date-text');
const cityContent = document.querySelector('.your-city-text');
const detailsDiv = document.querySelector('.details');

// Global variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'PLEASE REPLACE WITH YOUR OPENWEATHER API KEY';


//The Date
const today = new Date();
const theDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;


button.addEventListener('click', function(e) {
    e.preventDefault();
    const theCity = document.getElementById('city').value;
    const yourFeelings = document.getElementById('feelings').value;
    getTheWeatherData(baseURL, theCity, apiKey)
        .then(function(data) {
            //convert from Kelvin to Celsius
            const toCelsius = (data.main.temp - 273.15)
            const temperature = Math.round(toCelsius);
            const mood = yourFeelings
            const type = data.weather.map(param => param.main)
            postData('/newEntry', {
                temp: temperature,
                date: theDate,
                main: type,
                feeling: mood,
                thecity: theCity.toUpperCase()
            })
        })
        .then(
            () => updateUI()
        )
});


// Get weather api details
const getTheWeatherData = async (baseURL, city, key) => {
    console.log(`${baseURL}${city}&appid=${key}`);
    const response = await fetch(`${baseURL}${city}&appid=${key}`);
    try {
        const theWeatherData = await response.json();
        return theWeatherData;
    } catch (error) {
        console.log('Data could not be fetched!', error);
    }
}


// Boilerplate from course video
const postData = async(url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Something went wrong!", error);
    }
}

// Update UI
const updateUI = async () => {
    const request = await fetch('/getAllData');
    try {
        const weatherData = await request.json();
        detailsDiv.classList.add('entryHolder');
        cityContent.textContent = weatherData.thecity;
        dateContent.textContent = `Today\'s date: ${weatherData.date}`;
        mainContent.textContent = `Type of Weather: ${weatherData.main}`;
        tempContent.textContent = `The temperature is ${weatherData.temp}°C`;
        feelingContent.textContent = `I\'m feeling ${weatherData.feeling}`;
    } catch (error) {
        console.log('The UI could not be updated', error);
    }
}