`use strict`;

https://api.openweathermap.org/data/2.5/weather?q=London&appid=c9b2620838378342c11d0465c1bb0097

const $ = (id) => document.getElementById(id);
const $$ = (query) => document.querySelector(query);
const $$$ = (jquery) => document.querySelectorAll(jquery);

const cityForm = $$(`form`);
const card = $$(`.card`);
const details = $$(`.details`);
const time = $$(`img.time`);
const icon = $$(`.icon img`);

class Forecast {
  constructor() {
    this.key = `ka8rIV7i72kAHy3C1rsM3kZJ0nY47dda`;
    this.weatherURI = `http://dataservice.accuweather.com/currentconditions/v1/`;
    this.cityURI = `http://dataservice.accuweather.com/locations/v1/cities/search`;
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather (cityDets.Key);
  
    return { cityDets, weather }; // The keys values are the same so we can use this shorthand.
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`; // ? in the URL means we add query parameters to it.
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
  
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
  
    return data[0];
  }
}

const forecast = new Forecast();

console.log(forecast);

const updateUI = (data) => {

  /*
    const cityDets = data.cityDets;
    const weather = data.weather;

  Destructured properties syntax:
  */

  const { cityDets, weather} = data;

  // update template details
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images

  const iconSrc = `assets/weather-icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute(`src`, iconSrc);
 
 /* 
  let timeSrc = null;
 
  if(weather.IsDayTime) {
    timeSrc = `weather-icons/day.svg`;
  } else {
    timeSrc = `weather-icons/night.svg`;
  } - Ternary Operator way: */

let timeSrc = weather.IsDayTime ? `https://t3.ftcdn.net/jpg/02/59/42/54/360_F_259425456_nuW385z4eGarWkyeSs0aLcvgB2vP7yul.jpg` : `https://static.vecteezy.com/system/resources/thumbnails/005/732/461/small/night-time-scene-with-bright-full-moon-at-lake-vector.jpg`; // If the condition - before the '?' - is true it returns the first value, if it false it returns the second value.

  time.setAttribute(`src`, timeSrc);

  // remove the d-none class if present
  if(card.classList.contains(`d-none`)){
    card.classList.remove(`d-none`);
  }
};

const updateCity = async (city) => {
  console.log(city);
};

cityForm.addEventListener(`submit`, e => {
  // prevent default 'refresh' action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
  localStorage.setItem(`city`, city);
});

if(localStorage.getItem(`city`)) { // If `city` exists the code runs.
  forecast.updateCity(localStorage.getItem(`city`))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}