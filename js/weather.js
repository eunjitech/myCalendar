const APIKEY = '031cf902b809ab18f757380d59cb719e';
const COORDS = 'coords';
const weather = document.querySelector('.js-weather');
const iconImg = weather.querySelector('img');
const weatherInfo = weather.querySelector('.info');

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            const currentWeather = json.weather[0].main;
            const currentIcon = json.weather[0].icon;
            iconImg.src = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
            weatherInfo.innerHTML = currentWeather
        })

}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('좌표 정보를 읽어들일 수 없습니다');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
