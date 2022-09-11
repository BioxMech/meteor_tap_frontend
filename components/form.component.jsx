import { useState } from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css'

const Form = ({ setDateTime }) => {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const checkForm = () => {
    let dateTime = new moment(date + "T" + time).toISOString()
    if (dateTime !== null) {
      dateTime = dateTime.substring(0,19) + "Z"
      setDateTime(dateTime);
      return;
    }

    alert("Failed to input date/time")
  }

  return (
    <div data-testid="form" className={styles.inputGrid}>
      <div className={`${styles.card}`}>
        <h2>Date &darr;</h2>
        <p>
          <input 
            data-testid="date"
            className={styles.input} 
            type="date" 
            onChange={(e) => setDate(e.target.value)} 
          />
        </p>
      </div>
      <div className={ `${styles.card}`}>
        <h2>Time &darr;</h2>
        <p>
          <input 
            data-testid="time"
            className={styles.input} 
            type="time" 
            onChange={(e) => setTime(e.target.value)} 
          />
        </p>
      </div>
      <button data-testid="view" onClick={checkForm}>View</button>
    </div>
  )
}

export default Form;