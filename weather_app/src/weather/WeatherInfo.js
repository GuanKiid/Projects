import React, { useEffect } from 'react';
import useAPI from '../useAPI';

function WeatherInfo({ weatherData, cityName }) {
  const endpoint = "http://localhost:5000/weather";
  const { data: savedWeather, saveData, updateData } = useAPI(endpoint);

  let sunrise, sunset, daylightHours, nightHours;

  if (weatherData.sys) {
      sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(); // Convert Unix timestamp to time
      sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(); // Convert Unix timestamp to time

      // Calculate daylight hours
      daylightHours = (weatherData.sys.sunset - weatherData.sys.sunrise) / 3600; // Time in hours

      // Calculate night hours (assuming a 24-hour day)
      nightHours = 24 - daylightHours;
  }



  useEffect(() => {
    if (weatherData) {
      const existingEntry = savedWeather.find((entry) => entry.cityName === cityName);
      if (existingEntry) {
        updateData(existingEntry.id, { ...existingEntry, weatherData });
      }
    }
  }, [weatherData, cityName, savedWeather, updateData]);

  const handleSave = () => {
    if (weatherData) {
      const existingEntry = savedWeather.find((entry) => entry.cityName === cityName);
    //   if (!existingEntry) {
        saveData({ cityName, weatherData });
        alert('Weather data saved successfully!');
    //   } else {
    //     alert('Data already exists.');
    //   }
    }
  };

  return (
    <>
      <div className="weather-info text-center card bg-light">
        <h3>{cityName}</h3>
        <i className="bi bi-cloud-haze text-center display-2 text-warning"></i>
        {
          typeof weatherData.main === "undefined" ? (
            <p>No data found</p>
          ) : (
            <>
              <h3>{weatherData.main.temp}<sup>o</sup> Cel</h3>
              <hr />
              <div className="row">
                <div className="col-sm-4">{weatherData.main.temp_max}<sup>o</sup> Cel<br /><b>Max Temp</b></div>
                <div className="col-sm-4">{weatherData.main.temp_min}<sup>o</sup> Cel<br /><b>Min Temp</b></div>
                <div className="col-sm-4">{weatherData.main.humidity}%<br /><b>Humidity</b></div>
                <div><br></br></div>
                <div><br></br></div>
                <div className="col-sm-4">{weatherData.weather[0].description}<br /><b>Description</b></div>
                <div className="col-sm-4">{weatherData.rain ? weatherData.rain['1h'] : 0} mm<br /><b>Precipitation (1h)</b></div>
                {weatherData.sys && (
                                    <>
                                        <div className="col-sm-4">{sunrise}<br /><b>Sunrise</b></div>
                                        <div><br></br></div>
                                        <div><br></br></div>
                                        <div className="col-sm-4">{sunset}<br /><b>Sunset</b></div>
                                        <div className="col-sm-4">{daylightHours.toFixed(2)} hours<br /><b>Daylight Hours</b></div>
                                        <div className="col-sm-4">{nightHours.toFixed(2)} hours<br /><b>Night Hours</b></div>
                                    </>
                                )}
              </div>

              {/* Save Button */}
              <button className="btn btn-primary mt-3" onClick={handleSave}>Save Weather Data</button>
            </>
          )
        }
      </div>
    </>
  );
}

export default WeatherInfo;
