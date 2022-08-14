// Global Variables
var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=";
var APIKey = "e2f2ae4e3190eced8e68a78474ffc272";
var fullUrl =  weatherUrl + APIKey;
var searchHistory = [];
// var city = $("#search-box").val();
var returnedWeather = [];

//Full URL: https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=e2f2ae4e3190eced8e68a78474ffc272

// DOM elements 
var searchBar = $('#search-box');
var singleForecast = $('#day-forecast');
var weekForecast = $('#week-forecast');
var historyList = $('#search-history');



// This is reading the input value and calls the API
var weather = {
  fetchWeather: function(city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=imperial&appid=" 
      + APIKey,
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));

  },
  displayWeather: function(data) {
    const {name} = data;
    const{icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    const {uvi} = data.main;
    // console.log(name, icon, description, temp, humidity, speed, uvi);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".temp").innerText = "Temperature: " + temp + "ºF";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "MPH";
    document.querySelector(".uvi").innerText = "UV Index: " + uvi;
  },
  search: function() {
    this.fetchWeather(document.querySelector('#search-box').value)
  }
};

  //Get city by typying on search box:
  document.querySelector("#search-btn")
  .addEventListener("click", function() {
  weather.search();
});
document.querySelector("#search-box").addEventListener("keyup", function(event) {
  if(event.key == "Enter") { 
    weather.search();
  }
});
      
      // function(data) {
      //   console.log(data);
      //   var showIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      
      //     $('.icon').attr("src", showIcon);




// $("#search-btn").on("click", function(data) {
//     // console.log($("#search-box").val());
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + $("#search-box").val() + "&appid=" + APIKey;
//     fetch(queryURL)
//     .then((response) => response.json())
//     .then(data => returnedWeather = data)
//     .then((data) => console.log(data));


//       var showIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
//     console.log(showIcon)
//     $('.icon').attr('src', showIcon);

// });




  // $("#search-btn").on("click", function(data) {
  //   // console.log($("#search-box").val());
  //   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + $("#search-box").val() + "&appid=" + APIKey;
  //   fetch(queryURL)
  //   .then((response) => response.json())
  //   .then(data => returnedWeather = data)
  //   .then((data) => console.log(data));

  //   var showIcon = "https://openweathermap.org/img/w/0" + data.weather[0].icon + ".png";
  //   $('.icon').attr('src', showIcon);

  // });










// Time zone plugin
dayjs.extend(window.dayjs_plugin_utc);

dayjs.extend(window.dayjs_plugin_timezone);



// // Display search history function
// function displaySearchList() {
//     historyList.innerHTML = "";
//     for (var i = searchHistory.length -1; i >= 0; i--) {
//         var btn = document.createElement('button');
//         btn.setAttribute('type', 'button');
//         btn.setAttribute('aria-controls', 'Todays Forecast');
//         btn.classList.add('history-btn', 'btn-history');
//         btn.setAttribute('data-search', searchHistory[i]);
//         btn.textContent = searchHistory[i];
//         historyList.append(btn);
//     }
// }

// 

// Function to update search history in local storage -- call on displaySearchList()

// Function to display the current weather data

// Function to display the current weather data fetched from OpenWeather api.

// function renderCurrentWeather(city, weather, timezone) {
//     var date = dayjs().tz(timezone).format('M/D/YYYY');
  
    // Store response data from our fetch request in variables
//     var tempF = weather.temp;
//     var windMph = weather.wind_speed;
//     var humidity = weather.humidity;
//     var uvi = weather.uvi;
//     var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
//     var iconDescription = weather.weather[0].description || weather[0].main;
  
//     var card = document.createElement('div');
//     var cardBody = document.createElement('div');
//     var heading = document.createElement('h2');
//     var weatherIcon = document.createElement('img');
//     var tempEl = document.createElement('p');
//     var windEl = document.createElement('p');
//     var humidityEl = document.createElement('p');
//     var uvEl = document.createElement('p');
//     var uviBadge = document.createElement('button');
    
//     card.setAttribute('class', 'card');
//   cardBody.setAttribute('class', 'card-body');
//   card.append(cardBody);

//   heading.setAttribute('class', 'h3 card-title');
//   tempEl.setAttribute('class', 'card-text');
//   windEl.setAttribute('class', 'card-text');
//   humidityEl.setAttribute('class', 'card-text');

//   heading.textContent = `${city} (${date})`;
//   weatherIcon.setAttribute('src', iconUrl);
//   weatherIcon.setAttribute('alt', iconDescription);
//   weatherIcon.setAttribute('class', 'weather-img');
//   heading.append(weatherIcon);
//   tempEl.textContent = `Temp: ${tempF}°F`;
//   windEl.textContent = `Wind: ${windMph} MPH`;
//   humidityEl.textContent = `Humidity: ${humidity} %`;
//   cardBody.append(heading, tempEl, windEl, humidityEl);
//   uvEl.textContent = 'UV Index: ';
//   uviBadge.classList.add('btn', 'btn-sm');

//   if (uvi < 3) {
//     uviBadge.classList.add('btn-success');
//   } else if (uvi < 7) {
//     uviBadge.classList.add('btn-warning');
//   } else {
//     uviBadge.classList.add('btn-danger');
//   }

//   uviBadge.textContent = uvi;
//   uvEl.append(uviBadge);
//   cardBody.append(uvEl);

//   todayContainer.innerHTML = '';
//   todayContainer.append(card);
// }




// Function display forecast card -- append cards to section

/* Function to display forecast card above function x5*/