import styles from './index.module.scss'
import Image from 'next/image'

export default function NavBar () {

    return (
        <div className={styles.container}>
            <h1>Thaos</h1>
            <Image src={"/Burger.png"} alt='Burger menu' width={25} height={25} />
            <Image src={"/bag.png"} alt='shopping menu' width={25} height={25} />
        </div>
    )
}           
