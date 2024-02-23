import { useEffect, useState } from 'react'
import { fetchCitys, selectCity, selectCityStatus, selectCityError } from "../../redux/citySlice";
import { fetchWeather } from "../../redux/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

import Error from "../Status/Error";
import Loading from "../Status/Loading";
import './style.scss'
function CitySelect() {
  const [city, setCity] = useState('adana');
  const dispatch = useDispatch();
  const citys = useSelector(selectCity);
  const status = useSelector(selectCityStatus);
  const error = useSelector(selectCityError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCitys());
    }
    dispatch(fetchWeather(city))
  }, [dispatch, city]);

  return (
    <div className='CitySelect-container'>
      <div className='select'>
        <select name="city-names" id="city-names" value={city} onChange={(e) => setCity(e.target.value)}>
          {status === 'succeeded' && citys.map((city, index) =>
            <option key={index} value={city.name}>
              {city.name}
            </option>
          )}
          {status === 'loading' && <option><Loading /></option>}
          {status === 'failed' && <option><Error message={error} /></option>}
        </select>
      </div>
    </div>
  )
}

export default CitySelect
