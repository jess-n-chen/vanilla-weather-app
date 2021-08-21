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

  return `LUD: ${days[day]}, ${hours}:${minutes}`;
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

  weatherDesc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  temp.innerHTML = Math.round(response.data.main.temp);
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

//Declare Current City Value from HTML
//let city = document.querySelector(".city-name").innerHTML;
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchForm);
