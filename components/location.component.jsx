import axios from 'axios';
import { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Virtuoso } from 'react-virtuoso'

const Location = ({ setSS, trafficData, setGeolocation }) => {

  const [location, setLocation] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index, lat, lon, image) => {
    setSelectedIndex(index);
    setGeolocation({lat: lat, lon: lon})
    setSS(image)
  };

  const loadMore = async () => {
    console.log("LOADING MORE")
    const result  = await trafficData.slice(startIndex, stopIndex).reduce((prev, curr) => {
      return prev
        .then((acc) => 
          axios.get('https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=' + curr.location.latitude + "," + curr.location.longitude + `&token=${process.env.API_KEY}&buffer=10&addressType=All&otherFeatures=N`)
            .then(response => [...acc, {
              location: response.data.GeocodeInfo[0].ROAD,
              lat: curr.location.latitude,
              lon: curr.location.longitude,
              image: curr.image
            }])
        );
    }, Promise.resolve([]))
    setLocation([...location, ...result])
    // wait for 3 seconds to prevent API overload
    // for every 4th call
    if (startIndex % 9) { await timeout(3000); }
    setStartIndex(startIndex + 3);
    setStopIndex(stopIndex + 3);
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    console.log("location component")
    setStartIndex(0);
    setStopIndex(3);
    if (trafficData.length !== 0) { loadMore(); }
  }, [trafficData])

  const Footer = () => {
    return (
      <div
        data-testid="location-footer"
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div data-testid="location">
      {
        trafficData.length !== 0 ?
          <Virtuoso
            data-testid="list"
            style={{ height: 200 }}
            data={location}
            endReached={loadMore}
            overscan={100}
            itemContent={(index, locationObject) => {
              return (
                <ListItem data-testid={`item-${index}`} key={index} component="div" disablePadding>
                  <ListItemButton 
                    data-testid={`select-${index}`}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index, locationObject.lat, locationObject.lon, locationObject.image)}
                  >
                    <ListItemText data-testid={`text-${index}`} primary={locationObject.location} />
                  </ListItemButton>
                </ListItem>
              )
              
            }}
            components={{ Footer }}
          />
        :
          "Please fill in the Date and Time, and Generate"
      }
    </div>
  )
}

export default Location;