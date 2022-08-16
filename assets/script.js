// Global Variables
var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=";
var APIKey = "e2f2ae4e3190eced8e68a78474ffc272";
var fullUrl =  weatherUrl + APIKey;
var searchHistory = [];
var returnedWeather = [];

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



// This is reading the input value and calls the API
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
    // console.log(data)

    var uvi = data.current.uvi;
    var uviBadge = document.querySelector("#uviBadge");
    document.querySelector("#uviBadge").innerText = " " + uvi;
      // this.weekForecast(data)
      // this.displayUVI(data)

       // Setting UV coloring
       console.log(uvi)
        if (uvi <= 3.9) { 
          $("#uviBadge").addClass('uvi-good');
        } else if (uvi > 7) {
          $("#uviBadge").addClass('uvi-bad');
        } else {
          $("#uviBadge").addClass('uvi-medium');
        }
      });
    });

  },


  displayWeather: function(data) {
    const {name} = data;
    const{icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    const {uvi} = data.main;
    // console.log(name, icon, description, temp, humidity, speed, uvi);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".temp").innerText = "Temperature: " + temp + "ºF";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";

  },

  search: function() {
    this.fetchWeather(document.querySelector('#search-box').value)
  },


  weekForecast: function (data) {
    const{icon} = data.daily[i].weather[0].icon;
    const{description} = data.daily[i].weather[0].description;
    const {humidity} = data.daily[i].humidity;
    const {speed} = data.daily[i].wind_speed;
    document.querySelector(".description-forecast").innerText = description;
    document.querySelector(".icon-forecast").src = "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".temp-forecast").innerText = "Temperature: " + temp + "ºF";
    document.querySelector(".humidity-forecast").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind-forecast").innerText = "Wind Speed: " + speed + "mph";
  }
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









// Time zone plugin
dayjs.extend(window.dayjs_plugin_utc);

dayjs.extend(window.dayjs_plugin_timezone);

//Current Time and Date
// var currentTime = function () {
//   document.getElementById('currentTime').innerText = moment().format(
//     "dddd, MMM Do, h:mm:ss a"
//   );
// };
// setInterval(currentTime, 1000);



// Saving to localStorage
const storageSearch = document.querySelector('#search-box');
const saveBtn = document.querySelector('#search-btn');
const btnHistory = document.querySelector('.btn-history');

storageSearch.addEventListener('input', text => {
  btnHistory.innerText = text.target.value
})

const saveToStorage = () => {
  localStorage.setItem('city', btnHistory.innerText)
}

saveBtn.addEventListener('click', saveToStorage)
storageSearch.addEventListener('event.key == "Enter"', saveToStorage)


// Display search history function
function displaySearchList() {
    historyList.innerHTML = "";
    for (var i = searchHistory.length -1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'Todays Forecast');
        btn.classList.add('history-btn', 'btn-history');
        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        historyList.append(btn);
    }
}


// Function to update search history in local storage -- call on displaySearchList()


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
