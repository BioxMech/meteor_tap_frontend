import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Weather = ({ geolocation, areaData, forecastData, dailyForecast, fourDayForecast }) => {

  const [area, setArea] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [fourDayValues, setFourDayValues] = useState([]);

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

    let fourDayArr = []
    for (let i = 0; i < fourDayForecast.length; i++) {
      fourDayArr.push([moment(fourDayForecast[i].date).format("MMMM do, ddd"), fourDayForecast[i].forecast])
    }
    setFourDayValues(fourDayArr);
  }

  useEffect(() => {
    if (areaData.length !== 0) {
      searchForecast();
    }
  }, [geolocation])

  useEffect(() => {
    setArea(null);
    setForecast(null);
  }, [areaData])

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12} sm={4} data-testid="weather" >
      <Box className={`${styles.card}`}>
        <h2>Weather Forecast &darr;</h2>
        {
          areaData.length !== 0  ?
            geolocation.length != 0 ?
              <Box sx={{ width: '100%' }} data-testid="weather-details">
                <Typography><b>Region:</b> {area}</Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs data-testid="tab-list" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="2-Hour" {...a11yProps(0)} />
                    <Tab label="24-Hour" {...a11yProps(1)} />
                    <Tab label="4-day" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel data-testid="forecast" value={value} index={0}>
                  {forecast}
                </TabPanel>
                <TabPanel data-testid="dailyForecast" value={value} index={1}>
                  {dailyForecast}
                </TabPanel>
                <TabPanel data-testid="fourDayForecast" value={value} index={2}>
                  {
                    fourDayValues.map((day) => (
                      <div>
                        {day[0]} : 
                        <br />
                        {day[1]}
                        <hr />
                      </div>
                    ))
                  }
                </TabPanel>
              </Box>
            :
            "Please select a location"
          :
          'Waiting for locations to be generated'
        }
      </Box>
    </Grid>
  )
}

export default Weather