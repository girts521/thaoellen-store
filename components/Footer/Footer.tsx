import styles from './Footer.module.scss'
import Image from 'next/image'


const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
            <Image  src="/d-flower-right.png" alt='Flower image background' width={1000} height={1000} />
            </div>

        </div>
    )
}

export default Footer