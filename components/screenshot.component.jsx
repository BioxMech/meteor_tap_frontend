import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Skeleton from '@mui/material/Skeleton';

const Screenshot = ({ dateTime, ss }) => {

  return (
    <div data-testid="screenshot" className={`${styles.card}`}>
      <h2>Screenshot &darr;</h2>
      <div>
        {
          dateTime.length !== 0 ?
            !ss ?
              <Skeleton data-testid="skeleton" variant="rectangular" style={{ width: '100%' }} />
            : <img  data-testid="ss-image" src={ss} style={{ width: '100%' }} />
          : null
        }
      </div>
    </div>
  )
}

export default Screenshot;