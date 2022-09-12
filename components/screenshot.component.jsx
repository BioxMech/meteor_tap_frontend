import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Screenshot = ({ dateTime, ss }) => {

  return (
    <Grid item xs={12} data-testid="screenshot">
      <Box className={`${styles.card}`}>
        <h2>Traffic Camera Screenshot &darr;</h2>
        <div>
          {
            dateTime.length !== 0 ?
              !ss ?
                <>
                  Please select a location above: 
                  <hr />
                  <Skeleton data-testid="skeleton" variant="rectangular" style={{ width: '100%' }} />
                </>
              : <img  data-testid="ss-image" src={ss} style={{ width: '100%' }} />
            : "Waiting for locations to be generated"
          }
        </div>
      </Box>
    </Grid>
  )
}

export default Screenshot;