import styles from './Notification.module.scss';

const Notification = ({text}) => {

    return (
        <div className={styles.notification}>
            {text}
        </div>
    )
};

export default Notification;