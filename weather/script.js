let city = "Raba Wyżna";
const searchForm = document.querySelector("#search"),
    resultCard = document.querySelector('#result'),
    cityOut_elem = document.querySelector('#cityOut'),
    mainIcon_elem = document.querySelector('#mainIcon'),
    mainTemp_elem = document.querySelector('#mainTemp'),
    humidity_elem = document.querySelector('#humidity'),
    submitButton = document.querySelector("#searchButton"),
    inputCityName = document.querySelector('#cityIn');


document.addEventListener("DOMContentLoaded", function () {
   loadWeatherData(function () {
        resultCard.style.display = "block";
    });
});

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
   if (this.checkValidity()) {
        submitButton.disabled = true;
        submitButton.value = "Loading...";
        city = inputCityName.value;
        loadWeatherData(function () {
            inputCityName.value = null;
        });
    }
});

function loadWeatherData(callbackFunction) {

    const request = new XMLHttpRequest();
    const key = "eb9ba4d5906d3eecd90f0bb03297ec8b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&APPID=" + key;

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            updateWeatherData(response, callbackFunction);
        }
    };

    request.open("GET", url, true);
    request.send();
}

function updateWeatherData(data, callbackFunction = null) {
    const cityName = data.name,
        icon = data.weather[0].icon,
        icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png",
        description = data.weather[0].description,
        temp = data.main.temp,
        humidity = data.main.humidity,
        deg = "°",
        percent = "%";

   cityOut_elem.innerHTML = cityName;
    mainIcon_elem.setAttribute("src", icon_url);
    mainTemp_elem.innerHTML = Math.round(temp) + deg;
    humidity_elem.innerHTML = humidity + percent;

    submitButton.disabled = false;
    submitButton.value = "Get Weather";

  if (callbackFunction) {
      callbackFunction();
    }
}
