import { useState } from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';
import font from '../styles/Font.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomButton from './customButton.component';

const Form = ({ dateTime, setDateTime, loadingButton, setLoadingButton, setErrorMessageArr }) => {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClick = () => {
    let dt = new moment(date + "T" + time).toISOString()
    if (dt !== null) {
      setLoadingButton(true);
      dt = dt.substring(0,19) + "Z"
      setDateTime(dt);
      return;
    }

    setErrorMessageArr(["Failed to input date/time"])
  }

  return (
    <Grid data-testid="form" container spacing={2}>
      <Grid item xs={6}>
        <Box className={`${styles.card}`}>
          <h2>Date &darr;</h2>
          <p>
            <input 
              data-testid="date"
              className={styles.input} 
              type="date" 
              onChange={(e) => setDate(e.target.value)} 
            />
          </p>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box className={`${styles.card}`}>
          <h2>Time &darr;</h2>
          <p>
            <input 
              data-testid="time"
              className={styles.input} 
              type="time" 
              onChange={(e) => setTime(e.target.value)} 
            />
          </p>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="div" sx={{ textAlign: 'center', margin: 0 }}>
          <CustomButton handleClick={handleClick} loading={loadingButton} text={"Generate"} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Form;