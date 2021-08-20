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

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[day]}, ${hours}:${minutes}`;
}

function displayTemp(response) {
  let weatherDesc = document.querySelector(".weather-desc");
  let humidity = document.querySelector(".humid");
  let windSpeed = document.querySelector(".wind");
  let temp = document.querySelector(".tempvalue");
  let dateTimeValue = document.querySelector(".day-time");

  weatherDesc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  temp.innerHTML = Math.round(response.data.main.temp);
  dateTimeValue.innerHTML = dateTime(response.data.dt * 1000);

  console.log(response);
}

let apiKey = "8a7d387ef910673e2322fa2db8174c73";
let apiRoot = "https://api.openweathermap.org/data/2.5/weather";
let weatherUnits = "metric";

//Declare Current City Value from HTML
let city = document.querySelector(".city-name").innerHTML;

axios
  .get(apiRoot + "?q=" + city + "&appid=" + apiKey + "&&units=" + weatherUnits)
  .then(displayTemp);
