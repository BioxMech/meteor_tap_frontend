import styles from '../styles/Home.module.css';
import font from '../styles/Font.module.css';
import LoadingButton from '@mui/lab/LoadingButton';

const CustomButton = (props) => {

  return (
    <LoadingButton 
      data-testid="view"
      className={styles.button}
      onClick={props.handleClick}
      loading={props.loading}
      disabled={props.disabled === null ? false : props.disabled}
      loadingIndicator={
        <span className={font.blinkGrey}>
          "Fetching..."
        </span>
      }
      variant="outlined"
    >
      { props.children }
    </LoadingButton>
  )
}

export default CustomButton;