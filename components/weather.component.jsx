import { useEffect, useState } from 'react';

const Weather = ({ dateTime, geolocation}) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    
  }, [geolocation])

  return (
    <div data-testid="weather">
      THE WEATHER
    </div>
  )
}

export default Weather