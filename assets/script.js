// Global Variables
var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=";
var APIKey = "e2f2ae4e3190eced8e68a78474ffc272";
var fullUrl =  weatherUrl + APIKey;
var searchedHistory = [];

// Curl calls:
//Full URL for working UVI: https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=e2f2ae4e3190eced8e68a78474ffc272
//Full URL for all info except UVI:  https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=e2f2ae4e3190eced8e68a78474ffc272
// Daily url-- not working: https://pro.openweathermap.org/data/2.5/forecast/climate?lat=35&lon=139&appid=e2f2ae4e3190eced8e68a78474ffc272

// DOM elements 
var searchBar = $('#search-box');
var singleForecast = $('#day-forecast');
var weekForecast = $('#week-forecast');
var historyList = $('#search-history');
var timeEl = $('#time');
var dateEl = $('#date');


// Time zone plugin
dayjs.extend(window.dayjs_plugin_utc);

dayjs.extend(window.dayjs_plugin_timezone);




function renderForecastCard(forecast, timezone) {

  // variables for data from api
  var unixTs = forecast.dt;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  var iconDescription = forecast.weather[0].description;
  var tempF = forecast.temp.day;
  var { humidity } = forecast;
  var windMph = forecast.wind_speed;
  

  var col = document.querySelector('#week-forecast');
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h5');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  col.appendChild(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'week-forecast');
  col.classList.add('week-forecast');
  card.setAttribute('class', 'daily-card');


  cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} mph`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  weekForecast.append(col);
};



function renderForecast(dailyForecast, timezone) {

  // Create unix timestamps for start and end of 5 day forecast
  var startDt = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
  var endDt = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();
  var headingCol = document.createElement('div');
  var heading = document.createElement('h3');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  for (var i = 1; i < 6; i++) {
   
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }
  }
};


// Fetching both URLs
var weather = {
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=imperial&appid=" 
      + APIKey,
    )
    .then((response) => response.json())
    .then((data) => {
      this.displayWeather(data)


      fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
      + data.coord.lat
      + "&lon=" 
      + data.coord.lon
      + "&units=imperial&appid="
      + APIKey
    )
    .then((response) => response.json())
    .then((data) => {

    // renderForecastCard(data.current, data.dt);
    renderForecast(data.daily, data.dt)

    var uvi = data.current.uvi;
    var uviBadge = document.querySelector("#uviBadge");
    document.querySelector("#uviBadge").innerText = " " + uvi;


       // Setting UV coloring
        if (uvi <= 3.9) { 
          $("#uviBadge").removeClass();
          $("#uviBadge").addClass('uvi-good');
        } else if (uvi > 7) {
          $("#uviBadge").removeClass();
          $("#uviBadge").addClass('uvi-bad'); 
        } else {
          $("#uviBadge").removeClass();
          $("#uviBadge").addClass('uvi-medium');
          
        }
      });
    });
  },


  displayWeather: function(data) {
    const date = dayjs().tz().format('M/D/YYYY')
    const {name} = data;
    const{icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".temp").innerText = "Temperature: " + temp + "ºF";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
    document.querySelector(".date").innerText = date;

  },


// Activates the fetchWeather function
  search: function() {
    this.fetchWeather(document.querySelector('#search-box').value)
  },
};



  // Retrieving city by typying on search box:
  document.querySelector("#search-btn")
  .addEventListener("click", function() {
  weather.search();
});

document.querySelector("#search-box").addEventListener("keyup", function(event) {
  if(event.key == "Enter") { 
    weather.search();
  }
});






// Saving searched city to local Storage and adding to history list as btns
$("#search-btn").on("click", function(event) {
  event.preventDefault();

  var city = $("#search-box").val().trim();
    if (!searchedHistory.includes(city)) {
      searchedHistory.push(city);

        var searchedCityBtn = $(`
        <button class="btn-history">${city}</button>
        `);

        $("#search-history").append(searchedCityBtn); 
       
    };
    searchedCityBtn.on("click", function() {
      weather.search();
      
    });  

    localStorage.setItem("city", JSON.stringify(searchedHistory));
});
 