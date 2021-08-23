//Function to Display Forecast
function displayForecast(forecastResponse) {
  let futureDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastContain = document.querySelector(".future-weather");
  let forecastContainHTML = '<div class="row">';
  let futureDate = new Date(forecastResponse.data.daily[1].dt * 1000);
  let futureDay = futureDate.getDay();

  for (let i = 1; i < 7; i++) {
    forecastContainHTML =
      forecastContainHTML +
      `
  <div class="col-2">
          <p class="future-day">${futureDays[futureDay]}</p>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastResponse.data.daily[i].weather[0].icon
            }@2x.png"
            alt="${forecastResponse.data.daily[i].weather[0].description}"
            id="weather-icon-future"
          />
          <p class="future-temp"><span class="future-temp-max">
            ${Math.round(
              forecastResponse.data.daily[i].temp.max
            )}°</span> / <span class="future-temp-min">${Math.round(
        forecastResponse.data.daily[i].temp.min
      )}°</span>
          </p>
        </div>`;

    futureDays.push(futureDays.shift());
  }

  forecastContainHTML = forecastContainHTML + `</div>`;
  forecastContain.innerHTML = forecastContainHTML;
}

function getForecast(lat, lon) {
  let forecastPath = "/onecall";
  axios
    .get(
      apiRoot +
        forecastPath +
        "?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,minutely,hourly,alerts" +
        "&appid=" +
        apiKey +
        "&units=" +
        weatherUnits
    )
    .then(displayForecast);
}

//Function to Set Current Time & Date
function dateTime(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last Updated: ${days[day]}, ${hours}:${minutes}`;
}

//Function to Display Desired City's Weather
function displayTemp(response) {
  let weatherDesc = document.querySelector(".weather-desc");
  let humidity = document.querySelector(".humid");
  let windSpeed = document.querySelector(".wind");
  let temp = document.querySelector(".tempvalue");
  let dateTimeValue = document.querySelector(".day-time");
  let icon = document.querySelector("#weather-icon");

  weatherDesc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  temp.innerHTML = Math.round(response.data.main.temp);
  dateTimeValue.innerHTML = dateTime(response.data.dt * 1000);

  if (weatherUnits === "metric") {
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  } else {
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  }

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  //Display Forecast
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

//Function to Call Open Weather API for Current Weather
function weatherAPI(city) {
  let weatherPath = "/weather";
  axios
    .get(
      apiRoot +
        weatherPath +
        "?q=" +
        city +
        "&appid=" +
        apiKey +
        "&&units=" +
        weatherUnits
    )
    .then(displayTemp);
}

//Search Form Function
function searchForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = cityInput.value;
  weatherUnits = "metric";
  weatherAPI(cityInput.value);
}

//Function to Convert Cel to Fah
function convertC2F(event) {
  event.preventDefault();
  cel.classList.remove("active");
  fah.classList.add("active");

  let currentCity = document.querySelector(".city-name").innerHTML;
  weatherUnits = "imperial";
  weatherAPI(currentCity);
}

//Function to Revert Fah back to Cel Value
function convertF2C(event) {
  event.preventDefault();
  fah.classList.remove("active");
  cel.classList.add("active");

  let currentCity = document.querySelector(".city-name").innerHTML;
  weatherUnits = "metric";
  weatherAPI(currentCity);
}

//Declare API Key
let apiKey = "8a7d387ef910673e2322fa2db8174c73";
let apiRoot = "https://api.openweathermap.org/data/2.5";
let weatherUnits = "metric";

//Declare Current City Value from HTML
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchForm);

//Convert to F
let C2F = document.querySelector("#fah");
C2F.addEventListener("click", convertC2F);

//Convert back to C
let F2C = document.querySelector("#cel");
F2C.addEventListener("click", convertF2C);

//Initial Search When User Lands on Page
weatherAPI("New York");
