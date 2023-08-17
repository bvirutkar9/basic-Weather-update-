
function getValueCity(){
    const input = document.getElementById("city-name");
    return input.value;  
    // console.log(input.value);
}

function getValueState(){
    const input = document.getElementById("state-code");
    return input.value;  
    // console.log(input.value);
}
function getValueCountry(){
    const input = document.getElementById("country-code");
    return input.value;  
    // console.log(input.value);
}

async function fetchWeatherData() {
    try {
        const cit = getValueCity();
        const st = getValueState();
        const cnt = getValueCountry();
        const limit = 5;
        const apiKey = "184f35318876215918ce6231a41393c6";

        const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cit},${st},${cnt}&limit=${limit}&appid=${apiKey}`;

        console.log("city:", cit);
        console.log("state:", st);
        console.log("country:", cnt);

        const geoResponse = await fetch(geoApiUrl);
        if (!geoResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const geoData = await geoResponse.json();
        console.log("coordinates:", geoData);

        const lat = geoData[0].lat; //lat in  0th index of geoData
        const lon = geoData[0].lon;  //lon in  0th index of geoData
        // this value will be passed in api uing lexical scope
        console.log(lat,lon);
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherApiUrl);
        if (!weatherResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const weatherData = await weatherResponse.json();
        console.log("Weather data:", weatherData);

        return weatherData.main;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

search.addEventListener("click", async function() {
    const weather = await fetchWeatherData();


    const show0 = document.getElementById("data0");
    show0.textContent = weather.feels_like;

    const show1 = document.getElementById("data1");
    show1.textContent = weather.feels_like;

    const show2 = document.getElementById("data2");
    show2.textContent = weather.grnd_level;

    const show3 = document.getElementById("data3");
    show3.textContent = weather.humidity;

    const show4 = document.getElementById("data4");
    show4.textContent = weather.pressure;

    const show5 = document.getElementById("data5");
    show5.textContent = weather.sea_level;

    const show6 = document.getElementById("data6");
    show6.textContent = weather.temp;

    const show7 = document.getElementById("data7");
    show7.textContent = weather.temp_min;

});


