import styles from './index.module.scss'
import Image from 'next/image'

export default function NavBar() {

    return (
        <div className={styles.container}>
            <h1 className={`${styles.desktop} ${styles.h1}`}>Thao</h1>


            <h2 className={`${styles.desktop} ${styles.h2}`}> Nước hoa</h2>
            <h2 className={`${styles.desktop} ${styles.h2}`}> Mỹ phẩm</h2>
            <h2 className={`${styles.desktop} ${styles.h2}`}> Vitamin</h2>
            <h2 className={`${styles.desktop} ${styles.h2}`}> hơi già</h2>


            <div className={styles.imagecontainer}>
                <Image className={styles.mobile} src={"/Burger.png"} alt='Burger menu' width={25} height={25} />


                <Image src={"/bag.png"} alt='shopping menu' width={25} height={25} />
            </div>


        </div>
    )
}           
