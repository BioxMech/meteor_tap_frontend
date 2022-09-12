import styles from '../styles/Home.module.css';
import font from '../styles/Font.module.css';
import LoadingButton from '@mui/lab/LoadingButton';

const CustomButton = ({ handleClick, loading, text }) => {

  return (
    <LoadingButton 
      data-testid="view"
      className={styles.button}
      onClick={handleClick}
      loading={loading}
      loadingIndicator={
        <span className={font.blinkGrey}>
          "Fetching..."
        </span>
      }
      variant="outlined"
    >
      { text }
    </LoadingButton>
  )
}

export default CustomButton;