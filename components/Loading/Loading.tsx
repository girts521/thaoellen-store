import styles from './loading.module.scss'


const Loading = () => {

    return(
        <div className={styles.loading}>
        <div className={styles.spinner}>
          <svg viewBox="0 0 50 50">
            <circle className={styles.circle1} cx="25" cy="25" r="20" />
            <circle className={styles.circle2} cx="25" cy="25" r="15" />
          </svg>
        </div>
      </div>
    )
}

export default Loading