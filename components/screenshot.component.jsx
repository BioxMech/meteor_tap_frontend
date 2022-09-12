import styles from '../styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image'

const Screenshot = ({ dateTime, ss }) => {

  return (
    <Grid item xs={12} data-testid="screenshot">
      <Box className={`${styles.card}`}>
        <h2>Traffic Camera Screenshot &darr;</h2>
        
          {
            dateTime.length !== 0 ?
              !ss ?
                <>
                  Please select a location
                </>
              : <Image data-testid="ss-image" src={ss} alt="Camera Screenshot" width="100%" height="100%" layout="responsive" placeholder="blur" blurDataURL />
            : "Waiting for locations to be generated"
          }
        
      </Box>
    </Grid>
  )
}

export default Screenshot;