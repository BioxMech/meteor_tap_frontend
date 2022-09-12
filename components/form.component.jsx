import { useState } from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';

const Form = ({ setDateTime, loadingButton, setLoadingButton }) => {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const checkForm = () => {
    let dateTime = new moment(date + "T" + time).toISOString()
    if (dateTime !== null) {
      setLoadingButton(true);
      dateTime = dateTime.substring(0,19) + "Z"
      setDateTime(dateTime);
      return;
    }

    alert("Failed to input date/time")
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
          <LoadingButton 
            data-testid="view"
            className={styles.formButton}
            onClick={checkForm}
            loading={loadingButton}
            loadingIndicator="Fetching..."
            variant="contained"
          >
            Generate
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Form;