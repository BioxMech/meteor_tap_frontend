import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from '../components/form.component';
import Location from '../components/location.component';
import Weather from '../components/weather.component';
import Screenshot from '../components/screenshot.component';
import styles from '../styles/Home.module.css';
import font from '../styles/Font.module.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ErrorMessage from '../components/errorMessage.component';
import CustomLoader from '../components/customLoader.component';

export default function Home() {

  const [trafficData, setTrafficData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [fourDayForecast, setFourDayForecast] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [ss, setSS] = useState(null);
  const [geolocation, setGeolocation] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [errorMessageArr, setErrorMessageArr] = useState([]);
  const [gotErrors, setGotErrors] = useState(false);

  useEffect(() => {
    if (dateTime.length !== 0) {
      let errors = []
      axios.get('https://api.data.gov.sg/v1/transport/traffic-images?date_time=' + dateTime)
      .then(response => {
        setTrafficData(response.data.items[0].cameras);
      })
      .catch(error => {
        errors.push(error.message);
      })

      axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=' + dateTime)
      .then(response => {
        setAreaData(response.data.area_metadata);
        setForecastData(response.data.items[0].forecasts);
      })
      .catch(error => {
        errors.push(error.message);
      })

      axios.get('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date_time=' + dateTime)
      .then(response => {
        setDailyForecast(response.data.items[0].general.forecast);
      })
      .catch(error => {
        errors.push(error.message);
      })

      axios.get('https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date_time=' + dateTime)
      .then(response => {
        setFourDayForecast(response.data.items[0].forecasts);
      })
      .catch(error => {
        errors.push(error.message);
      })

      if (errors.length !== 0) {
        setErrorMessageArr(errors);
        setGotErrors(true);
        // failed to enter dateTime value
        // or API call failed
        setLoadingButton(false);
      }
    }
  }, [dateTime])

  return (
    <div className={styles.container}>
      <Head>
        <title>Meteor</title>
        <meta name="description" content="Track Traffic and Weather Forecast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" className={styles.main}>
        <h1 data-testid="title" className={`${font.mainHeading}`}>
          <span className={font.meteor}>Meteor:</span> Traffic/Weather Forecast!
        </h1>

        <p data-testid="author">
          <code className={font.rainbow}>Developed by Jason</code>
        </p>

        <h1 data-testid="description" className={font.title}>
          Pick a date and time &rarr; <span className={font.blinkGrey}>Let the magic happen</span>
        </h1>

        <Form dateTime={dateTime} setDateTime={setDateTime} loadingButton={loadingButton} setLoadingButton={setLoadingButton} />
        
        {
          dateTime.length !== 0 ?
            <Grid container spacing={2}>
              <Location setSS={setSS} areaData={areaData} forecastData={forecastData} trafficData={trafficData} setGeolocation={setGeolocation} setLoadingButton={setLoadingButton} />
              <Weather geolocation={geolocation} areaData={areaData} forecastData={forecastData} dailyForecast={dailyForecast} fourDayForecast={fourDayForecast} />
              <Screenshot dateTime={dateTime} ss={ss} />
            </Grid>
          :
            <Box sx={{ marginTop: '20px' }}>
              <CustomLoader >Waiting for the Date and Time...</CustomLoader>
            </Box>
        }

        {
          gotErrors ?
            <ErrorMessage>
              {`Error: ${errorMessageArr.join(' and ')}`}
            </ErrorMessage>
          :
            null
        }
      </Container>
    </div>
  )
}
