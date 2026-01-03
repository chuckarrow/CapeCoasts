import './App.css'
import Header from './header.jsx'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import Explore from './beach-profiles/explore.jsx'

const weatherIcons = import.meta.glob('./assets/weather/*.png', { eager: true })


function App() {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);
  const [animating, setAnimating] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (prevLocation.current === '/explore' && location.pathname === '/') {
      setSlideIn(true); // eslint-disable-line
      setTimeout(() => setSlideIn(false), 500);
    }
    prevLocation.current = location.pathname;
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header/>
          <Weather animating={animating} slideIn={slideIn}/>
          <Buttons setAnimating={setAnimating} slideIn={slideIn}/>
        </>
      } />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  )
}


function Weather({ animating, slideIn }) {

  const [{ tempC, highC, lowC, windSpeed, windDirection, prec, humidity }] = useState(() => {

    const temp = Math.round(Math.random() * (35 - 25) + 25);
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return {
      tempC: temp,
      highC: temp + Math.round(Math.random() * (12 - 5) + 5),
      lowC: temp - Math.round(Math.random() * (12 - 5) + 5),
      windSpeed: Math.round(Math.random() * (40 - 0) + 0),
      windDirection: directions[Math.floor(Math.random() * directions.length)],
      prec: Math.floor(Math.random() * 21) * 5,
      humidity: Math.round(Math.random() * (95 - 0) + 0)

    };
  });

const [displayedTemp, setDisplayedTemp] = useState(0);

useEffect(() => {
  const duration = 800; // quicker, 800ms
  const start = Date.now();
  const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const animate = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    setDisplayedTemp(Math.floor(eased * tempC));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}, [tempC]);

var sky = 'partlycloudy'
var skyIcon = weatherIcons[`./assets/weather/${sky}.png`]?.default


var windDirectionArrow = weatherIcons[`./assets/weather/arrow.png`]?.default

const directionMap = {
  'N': 0,
  'NE': 45,
  'E': 90,
  'SE': 135,
  'S': 180,
  'SW': 225,
  'W': 270,
  'NW': 315
}

var windDegrees = directionMap[windDirection] || 0






  return (
      <div className={`weather ${animating ? 'slide-off' : ''} ${slideIn ? 'slide-in' : ''}`}>
    <div className='weather-main-bar'>
      <div className='temp-group'>
        <h1>{tempC > 9 ? displayedTemp.toString().padStart(2, '0') : displayedTemp}°</h1>
        <div className='highlow'>
          <p>{highC}°</p>
          <p>{lowC}°</p>
        </div>
      </div>
      <img className='sky-image' src={skyIcon} alt="Weather icon" />
      <div className='wind-group'>
        <p className='wind'>{windSpeed}km/h</p>
        <img className='wind-direction-arrow' src={windDirectionArrow} style={{ transform: `rotate(${windDegrees}deg)` }} alt="Wind direction" />
      </div>
    </div>
    <div className='weather-extra-bar'>

    <p>Precipitation: {prec}%</p>
    <p>Humidity: {humidity}%</p>
    </div></div>
  )
}

function Buttons({ setAnimating, slideIn }) {
const navigate = useNavigate();
const [animating, setLocalAnimating] = useState(false);

const openExplore = () => {
  if (animating) return; // prevent multiple clicks
  setLocalAnimating(true);
  setAnimating(true);
  setTimeout(() => {
    navigate('/explore');
  }, 500); // match animation duration
}

return (
  <div className={`buttons-menu ${animating ? 'slide-off' : ''} ${slideIn ? 'slide-in' : ''}`}>
  <div className='button' onClick={openExplore}><p>Explore beaches</p></div>
  <div className='button'><p>Find upcoming events</p></div>
    <div className='button'><p>View Our Interactive Map</p></div>
    <div className='button'><p>About us</p></div>
    <div className='button'><p>Contact us!</p></div>
  </div>
)
}


export default App
