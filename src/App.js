import React from 'react';
import './App.css';
// import { useState, useEffect, } from 'react';
// import icon from './task-icon.png';
// import axios from 'axios';



const App = () =>{
  const [data, setData] = React.useState({})
  const [deg, setDeg] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [isLocation, setIsLocation] = React.useState(true);
  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`
    fetch(url)
    .then((response) => response.json()) 
    .then((json) => {
    setData(json)
    setIsLoading(false)
  }).catch((error) => {
      setIsError(true)
      // console.log(error);
    });
}

function error() {
  setIsLocation(false)
  alert("Sorry, no position available.");
}

  React.useEffect(() =>{
    // const watchID = navigator.geolocation.watchPosition(success, error, options);
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

if (!isLocation) return <div className='loading' style={{color: 'white'}}>Could not retrieve your position, please check your network connection, turn on your device location and grant location access...</div>
if (isLoading) return <div className='loading' style={{color: 'white'}}>Retrieving data...</div>
if (isError) return <div className='loading' style={{color: 'white'}}>An error occurred! Try refreshing page</div>

  return (
    <div className='container' style={{color: 'white'}}>
      <p className='title'>SirVinlex weather App</p>
      <div className='info-container'>
        <p>{data['name']}, {data['sys']['country']}</p>
        <p className='temp'>{deg ? `${data['main']['temp']} °C` : `${((data['main']['temp'] * 9/5) + 32).toFixed(2)} °F`}</p>
        <button className='btn' onClick={() => setDeg((prevState) => !prevState)} type='button'>{deg ? 'See in °F' : 'See in °C'}</button>
        <p>{data['weather'][0]['main']}</p>
      </div>
      <img className='img' src={data['weather'][0]['icon']} alt='weather icon' />
    </div>    
    );
}

export default App;



