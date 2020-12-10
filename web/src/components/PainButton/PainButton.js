import styles from './PainButton.module.css'

const PainButton = ({ ...props }) => {
  return (
    <>
      <button className={styles['pain-button']} {...props}>
        PAIN
      </button>
    </>
  )
}

export default PainButton
