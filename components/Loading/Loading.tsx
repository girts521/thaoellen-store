import styles from './loading.module.scss'
import Rives from '@rive-app/react-canvas'


const Loading = () => {

    return(
        <div className={styles.loading}>
        <Rives
          src="/animations/loading_animation.riv"
          stateMachines={['State Machine 1']}
          style={{ width: '500px', height: '500px', cursor: 'pointer' }} />
        {/* <div className={styles.spinner}>
          <svg viewBox="0 0 50 50">
            <circle className={styles.circle1} cx="25" cy="25" r="20" />
            <circle className={styles.circle2} cx="25" cy="25" r="15" />
          </svg>
        </div> */}
      </div>
    )
}

export default Loading