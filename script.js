const API_KEY = `a190652ff77d480f809a46d4733097f9`;
const input = document.getElementById('search-input');
const showWeather = document.getElementById('showWeather');

const getCountryName = async (countryCode) => {
  const API_URL = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data[0]?.name?.common || countryCode; 
  } catch (error) {
    console.error("Error fetching country name:", error);
    return countryCode; 
  }
};

const searchData = async () => {
  showWeather.innerHTML = `<span class="loader"></span>`;

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`;

  try {
    const fetchData = await fetch(API_URL);
    const response = await fetchData.json();
    console.log(response);
    if (response.cod === "404") {
      showWeather.innerHTML = `<h3 class="error" >City "${input.value}" not found</h3>`;
      return;
    }

    showData(response);
  } catch (error) {
    showWeather.innerHTML = `<h3 class="error">Please try again.</h3>`;
  }
};

const clearInput = () => {
    const input = document.getElementById('search-input');
    input.value = '';
    input.focus();
    showWeather.innerHTML = ''; 
};

const showData = async (data) => {
  const countryName = await getCountryName(data.sys.country); 

  showWeather.innerHTML = `
    <div class="location">${data.name}, ${countryName}</div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <div class="temperature">${Math.round(data.main.temp)}°C</div>
    <div class="description">${data.weather[0].description}</div>
    <div class="details">
      <div class="Hum">
        <img src="./Assets/humidity.png" alt="Humidity">
        <h2>Humidity: ${data.main.humidity}%</h2>
      </div>
      <div class="wind">
        <img src="./Assets/wind.png" alt="Wind">
        <div><h2>Wind: ${data.wind.speed} km/h</h2></div>
      </div>
    </div>
  `;
};
