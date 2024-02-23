import { useSelector, useDispatch } from "react-redux";
import { selectWeather, selectWeatherLoading, selectDays } from "../../redux/weatherSlice";

import Loading from "../Status/Loading";
import Error from "../Status/Error";
import './style.scss';
function TodayWeather() {
  const dispatch = useDispatch();
  const weather = useSelector(selectWeather);
  const days = useSelector(selectDays);
  const isLoading = useSelector(selectWeatherLoading);

  return (
    <div className="today-weather-container">
      {isLoading ? <Loading /> :
        <>
          <h2>{days[0]}</h2>
          <div className="info-container">
            {weather && weather.length > 0 &&
              <img src={`/weatherIcon/${weather[0].weather[0].icon.slice(0, 2)}.png`} alt="weather icon" />
            }
            <div className="today-weather-temp">
              {weather && weather.length > 0 &&
                <div>
                  <h2>{Math.round(weather[0].main.temp)}°C</h2>
                  <p>{weather[0].weather[0].description}</p>
                </div>
              }
            </div>
            <div className="today-weather-info">
              <div>
                <p>Humidity: {weather && weather.length > 0 && weather[0].main.humidity}%</p>
              </div>
              <div>
                <p>Wind: {weather && weather.length > 0 && weather[0].wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </>}
    </div>
  )
}

export default TodayWeather
