import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomButton from './customButton.component';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import ErrorMessage from './errorMessage.component';

const Form = ({ dateTime, setDateTime, loadingButton, setLoadingButton }) => {

  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [gotErrors, setGotErrors] = useState(false);
  const [errorMessageArr, setErrorMessageArr] = useState([]);

  const isValid = (value) => {
    var momentDate = moment(value);
    return momentDate.isValid();
  }

  const handleClick = () => {
    if (isValid(date) && isValid(time)) {
      let dt = new moment(date.format("YYYY-MM-DD") + "T" + time.format("HH:MM")).toISOString();
      setLoadingButton(true);
      dt = dt.substring(0,19) + "Z"
      if (dt === dateTime) {
        setLoadingButton(false);
        setErrorMessageArr(["Similar Date and/or Time"])
        setGotErrors(true);
        return;
      }
      setDateTime(dt);
      return;
    }
    
    setErrorMessageArr(["Failed to input date/time"]);
    setGotErrors(true);
    setLoadingButton(false);
  }

  return (
    <Grid data-testid="form" container spacing={2}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid item xs={6}>
          <Box className={`${styles.card}`}>
            <h2>Date &darr;</h2>
            <DatePicker
              className={styles.picker}
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField data-testid="date" {...params} sx={{ input: { fontSize: 'calc(12px + 0.6vw)' } }} />}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={`${styles.card}`}>
            <h2>Time &darr;</h2>
            <TimePicker
              className={styles.picker}
              value={time}
              onChange={setTime}
              renderInput={(params) => <TextField data-testid="time" {...params} sx={{ input: { fontSize: 'calc(12px + 0.6vw)' } }} />}
            />
          </Box>
        </Grid>
      </LocalizationProvider>
      <Grid item xs={12}>
        <Box component="div" sx={{ textAlign: 'center', margin: 0 }}>
          <CustomButton data-testid="view" handleClick={handleClick} loading={loadingButton} disabled={gotErrors}>
            { gotErrors ? "Disabled" : "Generate" }
          </CustomButton>
        </Box>
      </Grid>
        {
          gotErrors ?
            <ErrorMessage>
              {`Error: ${errorMessageArr.join(' and ')}`}
            </ErrorMessage>
          :
            null
        }
    </Grid>
  )
}

export default Form;