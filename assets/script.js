// Global Variables
var weatherUrl = "https://api.openweathermap.org/data/3.0/onecall";
var apiKey = "e2f2ae4e3190eced8e68a78474ffc272";
var searchHistory = [];


// DOM elements
var searchBar = document.querySelector('#search-box');
var singleForecast = document.querySelector('#day-forecast');
var weekForecast = document.querySelector('#week-forecast');
var historyList = document.querySelector('#search-history');


// Time zone plugin
dayjs.extend(window.dayjs_plugin_utc);

dayjs.extend(window.dayjs_plugin_timezone);


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

// Function to display the current weather data
// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather, timezone) {
    var date = dayjs().tz(timezone).format('M/D/YYYY');
  
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

// Function to display forecast card (above function) x5