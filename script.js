const searchButton = document.querySelector('#search');
const cityInput = document.querySelector('#city');

let weather = {
  'api-key': '5733ad8021a769838c2a19699dea3309',

  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this['api-key']}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));

    document.querySelector('.info').classList.remove('loading');
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector('#resultCity').innerText = `Clima em ${name}`;
    document.querySelector('#temp').innerText = `${parseInt(temp) - 273}°C`;
    document.querySelector('#description').innerText = `${description} ${icon}`;
    document.querySelector('#humidity').innerText = `humidade: ${humidity}%`;
    document.querySelector(
      '#speed'
    ).innerText = `velocidade do vento: ${speed} k/h`;
  },
};

const search = () => {
  let city = document.querySelector('#city').value;
  city = city.split(' ').join('+');
  weather.fetchWeather(city);
  cityInput.value = '';
};

cityInput.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    search();
  }
});

searchButton.addEventListener('click', () => search());

weather.fetchWeather('curitiba');
