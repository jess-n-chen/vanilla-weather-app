//Function to Set Current Time & Date
function dateTime(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  console.log(minutes);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[day]}, ${hours}:${minutes}`;
}

//Function to Display Desired City's Weather
function displayTemp(response) {
  console.log(response);
  let weatherDesc = document.querySelector(".weather-desc");
  let humidity = document.querySelector(".humid");
  let windSpeed = document.querySelector(".wind");
  let temp = document.querySelector(".tempvalue");
  let dateTimeValue = document.querySelector(".day-time");
  let icon = document.querySelector("#weather-icon");

  tempCel = response.data.main.temp;

  weatherDesc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  temp.innerHTML = Math.round(tempCel);
  dateTimeValue.innerHTML = dateTime(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function weatherAPI(city) {
  //Declare API Key
  let apiKey = "8a7d387ef910673e2322fa2db8174c73";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUnits = "metric";

  axios
    .get(
      apiRoot + "?q=" + city + "&appid=" + apiKey + "&&units=" + weatherUnits
    )
    .then(displayTemp);
}

function searchForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = cityInput.value;
  weatherAPI(cityInput.value);
}

function convertC2F(event) {
  event.preventDefault();
  cel.classList.remove("active");
  fah.classList.add("active");

  let currentTemp = document.querySelector(".tempvalue");
  let currentTempValue = (tempCel * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(currentTempValue);
}

function convertF2C(event) {
  event.preventDefault();
  fah.classList.remove("active");
  cel.classList.add("active");

  let currentTemp = document.querySelector(".tempvalue");
  currentTemp.innerHTML = Math.round(tempCel);
}

//Declare Default Temp Value from HTML as Current Temp
let tempCel = document.querySelector(".tempvalue").innerHTML;
tempCel = parseInt(tempCel, 10);

//Declare Current City Value from HTML
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchForm);

//Convert to F
let C2F = document.querySelector("#fah");
C2F.addEventListener("click", convertC2F);

//Convert back to C
let F2C = document.querySelector("#cel");
F2C.addEventListener("click", convertF2C);
