import Head from 'next/head'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Form from '../components/form.component'
import Location from '../components/location.component'
import Weather from '../components/weather.component'
import Screenshot from '../components/screenshot.component'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [trafficData, setTrafficData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [ss, setSS] = useState(null);
  const [geolocation, setGeolocation] = useState([]);

  useEffect(() => {
    if (dateTime.length !== 0) {
      axios.get('https://api.data.gov.sg/v1/transport/traffic-images?date_time=' + dateTime)
      .then(response => {
        setTrafficData(response.data.items[0].cameras);
      })
      .catch(error => {
        alert("Please alert the administrator for the following error:" + error.message) // failed to enter dateTime value
      })
    }
  }, [dateTime])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <Form setDateTime={setDateTime} />

        {/* Grid */}
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.location}`}>
            <h2>Location &darr;</h2>
            <Location setSS={setSS} trafficData={trafficData} setGeolocation={setGeolocation} />
          </div>
          <div className={`${styles.card} ${styles.weather}`}>
            <h2>Weather &darr;</h2>
            <Weather dateTime={dateTime} geolocation={geolocation} />
          </div>
        </div>

        <Screenshot ss={ss} />
        
      </main>
    </div>
  )
}
