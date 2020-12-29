'use strict';

const searchInput = document.querySelector('.search__input');

const weatherDate = {
  date: {},
};

const transWeekday = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

const transMomth = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

const appId = 'fd41809727a851f1ad9f012ab8afbe8c';
const countryLanguage = 'zh_tw';

const jsonDate = async apiHttp => {
  const res = await fetch(apiHttp);
  const date = await res.json();
  return date;
};

const loadweather = async apiHttp => {
  try {
    const date = await jsonDate(apiHttp);
    const now = new Date();

    console.log(date);

    weatherDate.date = {
      country: date.sys.country,
      city: date.name,
      max_temp: date.main.temp_max.toFixed(1),
      min_temp: date.main.temp_min.toFixed(1),
      temp: date.main.temp.toFixed(1),
      descriptionIcon: date.weather[0].icon,
      descriptionWord: date.weather[0].description,
      humidity: date.main.humidity,
      wind: date.wind.speed,
      weekday: transWeekday[now.getDay()],
      month: transMomth[now.getMonth()],
      day: now.getDate(),
    };

    const lodePageDate = (date = weatherDate.date) => {
      document.querySelector('.container').style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/? " + date.city + "')";

      document.querySelector('.week').textContent = `${date.weekday}`;
      document.querySelector(
        '.month'
      ).textContent = `${date.month} ${date.day}`;
      document.querySelector('.name__country').textContent = `${date.country}`;
      document.querySelector('.name__city').textContent = `${date.city}`;

      document.querySelector(
        '.temp__maxandmin'
      ).textContent = `最高溫:${date.max_temp} 最低溫:${date.min_temp}`;
      document.querySelector('.temp__now').textContent = `${date.temp}°C`;
      document.querySelector(
        '.description__icon'
      ).src = `https://openweathermap.org/img/wn/${date.descriptionIcon}@2x.png`;
      document.querySelector(
        '.description__word'
      ).textContent = `${date.descriptionWord}`;
      document.querySelector(
        '.humuitidy'
      ).textContent = `濕度:${date.humidity}%`;
      document.querySelector('.wind').textContent = `風速:${date.wind}km/h`;
    };

    lodePageDate();
  } catch {
    console.error('請輸入正確城市名稱(英文)');
    searchInput.placeholder = `請輸入正確城市名稱(英文) :)`;
  }
};

/*    const byGeolocationApi = (lat, lng) => {
      const appId = 'fd41809727a851f1ad9f012ab8afbe8c';
      const countryLanguage = 'zh_tw';
      const apiHttp = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=${countryLanguage}&appid=${appId}`;
      return apiHttp;
    };
*/

const getMapLode = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const apiHttp = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=${countryLanguage}&appid=${appId}`;

    loadweather(apiHttp);
  });
};
getMapLode();

/*
const bySearchIdApi = id => {
  const appId = 'fd41809727a851f1ad9f012ab8afbe8c';
  const countryLanguage = 'zh_tw';
  const apiHttp = `http://api.openweathermap.org/data/2.5/weather?q=${id}&units=metric&lang=${countryLanguage}&appid=${appId}`;
  return apiHttp;
};
*/

const getSearchIdLode = () => {
  const searchCountry = searchInput.value;

  const apiHttp = `http://api.openweathermap.org/data/2.5/weather?q=${searchCountry}&units=metric&lang=${countryLanguage}&appid=${appId}`;

  loadweather(apiHttp);
};

document.querySelector('.search__btn').addEventListener('click', () => {
  getSearchIdLode();
  searchInput.placeholder = `搜尋城市(英文)
  `;
  searchInput.value = '';
});

document.querySelector('.search').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    getSearchIdLode();
    searchInput.value = '';
    searchInput.placeholder = `搜尋城市(英文)
  `;
  }
});
