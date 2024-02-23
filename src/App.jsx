import CitySelect from './components/CitySelect';
import TodayWeather from './components/TodayWeather';
import WeekWeather from './components/WeekWeather';
import Footer from "./components/Footer";

import './App.scss';
function App() {
  return (
    <>
      <div className='app-container'>
        <CitySelect />
        <TodayWeather />
        <WeekWeather />
      </div>
      <Footer />
    </>
  );
}

export default App;
