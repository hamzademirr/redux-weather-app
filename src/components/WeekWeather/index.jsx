import { selectWeather, selectWeatherLoading, selectWeatherError, selectDays } from "../../redux/weatherSlice";
import { useSelector } from "react-redux";

import Loading from "../Status/Loading";
import Error from "../Status/Error";
import './style.scss'
function WeekWrather() {
  const weather = useSelector(selectWeather);
  const days = useSelector(selectDays);
  const isLoading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);

  return (
    <div>
      <hr />
      {isLoading ? <Loading /> :
        <div className='week-weather-container'>
          {weather.map((day, index) => (
            <div key={index} className='day-container'>
              <p>{days[index]}</p>
              <img src={`/weatherIcon/${day.weather[0].icon.slice(0, 2)}.png`} alt='weather icon' />
              <p>{day.main.temp}°C</p>
            </div>
          ))}
        </div>}
    </div>
  )
}

export default WeekWrather
