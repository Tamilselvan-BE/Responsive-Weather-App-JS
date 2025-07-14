const apiKey = "44849acde50566d732e412c08485977c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-image");
const details = document.querySelector(".details");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    const weatherMain = data.weather[0].main;
    switch (weatherMain) {
      case "Clouds":
        weatherIcon.src = "image/cloud.png";
        break;
      case "Clear":
        weatherIcon.src = "image/sun.png";
        break;
      case "Rain":
        weatherIcon.src = "image/heavy_rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "image/cloudy_sunny.png";
        break;
      case "Mist":
        weatherIcon.src = "image/mist.png";
        break;
      default:
        weatherIcon.src = "image/cloudy_sunny.png"; // fallback icon
    }

    details.classList.remove("d-none"); // Show weather info
  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
