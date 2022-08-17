// Global Variables
var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=";
var APIKey = "e2f2ae4e3190eced8e68a78474ffc272";
var fullUrl =  weatherUrl + APIKey;
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
  col.classList.add('week-forecast'); //col.classList.add('five-day-card');
  card.setAttribute('class', 'daily-card');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

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

  // forecastContainer.innerHTML = '';
  // forecastContainer.append(headingCol);
  for (var i = 1; i < 6; i++) {
    // The api returns forecast data which may include 12pm on the same day and
    // always includes the next 7 days. The api documentation does not provide
    // information on the behavior for including the same day. Results may have
    // 7 or 8 items.
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }
  }
};




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








// Saving searched city to local Storage
document.getElementById('search-btn')
.addEventListener('click', function (event) {
  event.preventDefault();
  
  var city = document.getElementById('search-box').val;
  localStorage.setItem("city", city);
  });



// Saving to localStorage
// const searchInput = $('#search-box'); //id for input box
// const saveBtn = $('#search-btn'); // id for search btn
// const btnHistory = $('.btn-history'); // This is the class for each new btn 
// const historyArea = $('search-history'); //this is the area where the list of btns need to show

// var searchedHistory = [];
// function saveToStorage() {

//   var searchedCity = document.querySelector('#search-box').text;
  
//   if(localStorage.getItem('data') == null){
//     localStorage.setItem('data', '[]');
//   }
//   var savedCity = JSON.parse(localStorage.getItem('data'));
//   savedCity.push(searchedCity)

//   localStorage.setItem('data', JSON.stringify(savedCity));

// }

// searchInput.addEventListener('input', text => {
//     btnHistory.innerText = text.target.value
//   })

// const saveToStorage = () => {
//   localStorage.setItem('city', btnHistory.innerText)
// }

// saveBtn.addEventListener('click', saveToStorage)
// storageSearch.addEventListener('event.key == "Enter"', saveToStorage)













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



