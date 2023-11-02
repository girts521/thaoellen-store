import styles from './index.module.scss'
import Image from 'next/image'

interface HeadingProps {
    text: string

}

const Heading = (props: HeadingProps) => {

    const { text } = props

    return (
        <div className={styles.container}>
        <Image className={styles.flowerLeft} src="/d-flower-left.png" alt='Flower image background' width={1000} height={1000} />
        <Image className={styles.flowerRight} src="/d-flower-right.png" alt='Flower image background' width={1000} height={1000} />

        <h1 className={styles.heading}>{text}</h1>
        </div>
    )
}

export default Heading