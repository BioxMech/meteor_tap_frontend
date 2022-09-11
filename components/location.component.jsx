import { useEffect, useState } from 'react';

const Location = ({ dateTime, settingScreenShot, trafficData, setGeolocation }) => {

  const [location, setLocation] = useState([]);

  useEffect(() => {
    setLocation(trafficData.location)
  }, [trafficData])

  return (
    <div data-testid="location">
      {
        trafficData.length !== 0 ?
          <div>
            Location: {location}
          </div>
        :
          "Please fill in the Date and Time, and Generate"
      }
    </div>
  )
}

export default Location