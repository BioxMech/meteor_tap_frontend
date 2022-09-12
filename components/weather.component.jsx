import { useEffect, useState } from 'react';

const Weather = ({ geolocation, areaData, forecastData }) => {

  const [area, setArea] = useState(null);
  const [forecast, setForecast] = useState(null);

  const searchForecast = () => {
    // find the smallest difference of lat and lon
    let total = 9999999;
    let area = "";
    let forecast = "";
    for (let i = 0; i < areaData.length; i++) {
      let currentLat = geolocation.lat - areaData[i].label_location.latitude;
      let currentLon = geolocation.lon - areaData[i].label_location.longitude;
      let currentTotal = Math.abs(currentLat) + Math.abs(currentLon);

      // to get the smallest difference for both latitude and longitude
      if (currentTotal < total) {
        total = currentTotal;
        area = forecastData[i].area;
        forecast = forecastData[i].forecast;
      }
    }

    setArea(area);
    setForecast(forecast);
  }

  useEffect(() => {
    if (areaData.length !== 0) {
      searchForecast();
    }
  }, [geolocation])

  return (
    <div data-testid="weather">
      {
        areaData.length !== 0 ?
        <div data-testid="weather-details">
          Area: {area}
          <br />
          Forecast: {forecast}
        </div>
        :
        null
      }
    </div>
  )
}

export default Weather