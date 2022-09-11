import { useState } from 'react';
import styles from '../styles/Home.module.css'

const Form = ({ formResults }) => {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const checkForm = () => {
    console.log("check form")
    formResults(date + "," + time)
  }

  return (
    <div data-testid="form" className={styles.inputGrid}>
      <div className={`${styles.card}`}>
        <h2>Date &darr;</h2>
        <p>
          <input 
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
            className={styles.input} 
            type="time" 
            onChange={(e) => setTime(e.target.value)} 
          />
        </p>
      </div>
      <button primary onClick={checkForm}>View</button>
    </div>
  )
}

export default Form;