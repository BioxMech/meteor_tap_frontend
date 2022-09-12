import Head from 'next/head'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Form from '../components/form.component'
import Location from '../components/location.component'
import Weather from '../components/weather.component'
import Screenshot from '../components/screenshot.component'
import styles from '../styles/Home.module.css'
import Grid from '@mui/material/Grid';

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
        // failed to enter dateTime value
        // or API call failed
        alert("Please alert the administrator for the following error:" + errors.join(' and '))
      }
    }
  }, [dateTime])

  return (
    <div className={styles.container}>
      <Head>
        <title>Meteor</title>
        <meta name="description" content="Track Traffic and Weather Forecast" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Meteor Traffic/Weather Forecast! (by <a href="https://www.mom.gov.sg/">MoM</a>)
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Developed by Jason</code>
        </p>

        <Form dateTime={dateTime} setDateTime={setDateTime} loadingButton={loadingButton} setLoadingButton={setLoadingButton} />
        
        <Grid container spacing={2}>
          <Location setSS={setSS} trafficData={trafficData} setGeolocation={setGeolocation} setLoadingButton={setLoadingButton} />
          <Weather geolocation={geolocation} areaData={areaData} forecastData={forecastData} dailyForecast={dailyForecast} fourDayForecast={fourDayForecast} />
          <Screenshot dateTime={dateTime} ss={ss} />
        </Grid>
      </main>
    </div>
  )
}
