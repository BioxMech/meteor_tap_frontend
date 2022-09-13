import styles from '../styles/Home.module.css';
import { MagnifyingGlass, Comment } from  'react-loader-spinner'
import Box from '@mui/material/Box';

const CustomLoader = (props) => {
  
  return (
    <>
      <Box className={styles.center} data-testid="loader">
        <Box>
          {
            props.type === "search" ?
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#c0efff'
                color = '#ef6b73'
              />
            :
              <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="black"
                backgroundColor="#5ccfe6"
              />
          }
        </Box>
        <Box>{props.children}</Box>
    </Box>
    </>
  )
};

export default CustomLoader;