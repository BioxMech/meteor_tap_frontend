import axios from 'axios';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Virtuoso } from 'react-virtuoso';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomLoader from './customLoader.component';

const Location = ({ dateTime, areaData, forecastData, setSS, trafficData, setGeolocation, setLoadingButton }) => {

  const [location, setLocation] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [ended, setEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleListItemClick = (event, index, lat, lon, image) => {
    setSelectedIndex(index);
    setGeolocation({lat: lat, lon: lon})
    setSS(image)
  };

  const loadMore = async () => {
    const minStartIndex = Math.min(startIndex, trafficData.length - 1)
    const maxStopIndex = Math.min(stopIndex, trafficData.length)
    const arr = trafficData.slice(minStartIndex, maxStopIndex);

    if (arr.length !== 0) {
      const result = await arr.reduce((prev, curr) => {
        return prev
          .then((acc) => 
            axios.get('https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=' + curr.location.latitude + "," + curr.location.longitude + '&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkyMTIsInVzZXJfaWQiOjkyMTIsImVtYWlsIjoidXNlZm9ydGhlcmFtQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY2MjYzMjcyMCwiZXhwIjoxNjYzMDY0NzIwLCJuYmYiOjE2NjI2MzI3MjAsImp0aSI6IjI3MDhiYzVjNjU0MTc1ZTVjY2Y0ZjQ5ZDU0NTJiZWJmIn0.zo5aotv55M1soStaRnjvww2SDAXxES2b0Tddz6fE8_I&buffer=10&addressType=All&otherFeatures=N')
              .then(response => {
                if (response.data.GeocodeInfo.length !== 0) {
                  let total = 9999999;
                  let area = "";
                  for (let i = 0; i < areaData.length; i++) {
                    let currentLat = curr.location.latitude - areaData[i].label_location.latitude;
                    let currentLon = curr.location.longitude - areaData[i].label_location.longitude;
                    let currentTotal = Math.abs(currentLat) + Math.abs(currentLon);

                    // to get the smallest difference for both latitude and longitude
                    if (currentTotal < total) {
                      total = currentTotal;
                      area = forecastData[i].area;
                    }
                  }
                  return [...acc, {
                    location: response.data.GeocodeInfo[0].ROAD === "NIL" ? "Other" : response.data.GeocodeInfo[0].ROAD + " " + `(${area})`,
                    lat: curr.location.latitude,
                    lon: curr.location.longitude,
                    image: curr.image
                  }]
                }
                setEnded(true);
                return [...acc];
              })
              .catch((error) => {
                console.error(error);
              })
          ).catch((error) => {
            console.error(error);
          })
      }, Promise.resolve([]))

      try {
        setLocation([...location, ...result])
      } catch (e) { setEnded(true); }
      // wait for 3 seconds to prevent API overload
      // for every 4th call
      if (startIndex % 9) { await timeout(3000); }
      setStartIndex(startIndex + 6);
      setStopIndex(stopIndex + 6);
    } else {
      setEnded(true);
    }
    setLoading(false);
    setLoadingButton(false);
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setStartIndex(0);
    setStopIndex(5);
    setLocation([]);
    setEnded(false);
    setLoading(true);
    setSelectedIndex(null);
    setSS(null);
    setGeolocation([]);
    loadMore();
  }, [trafficData])

  const Footer = () => {
    return (
      <>
        {
          ended ?
            null
          : 
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
        }
      </>
    )
  }

  return (
    <Grid item xs={12} sm={8} data-testid="location">
      <Box className={`${styles.card}`}>
        <h2>Location &darr;</h2>
        {
          trafficData.length !== 0 ?
            !loading ?
              <Virtuoso
                data-testid="list"
                className={styles.list}
                style={{ height: 200 }}
                data={location}
                endReached={loadMore}
                overscan={100}
                itemContent={(index, locationObject) => {
                  return (
                    <ListItem key={index} component="div" disablePadding className={styles.listItem}>
                      <ListItemButton 
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index, locationObject.lat, locationObject.lon, locationObject.image)}
                        className={styles.listItemButton}
                        disabled={selectedIndex === index ? true : false}
                      >
                        <ListItemText primary={locationObject.location} />
                      </ListItemButton>
                    </ListItem>
                  )
                  
                }}
                components={{ Footer }}
              />
            :
            <CustomLoader type="search">Putting data into a list...</CustomLoader>
          :
            "Please fill in the Date and Time, and Generate"
        }
      </Box>
    </Grid>
  )
}

export default Location