import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link';


const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/d-flower-right.png"
          alt="Flower image background"
          width={1000}
          height={1000}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>Thao</h1>
        <div className={styles.contactInfo}>
          Email: contact@thaoellen.com
          <br/>
          Điện Thoại: +49 176 56726448 
          <br/>
          Địa Chỉ:
          Suhler Str. 108, Berlin, Germany
          <br/>
          <Link href="/tos">Điều khoản và điều kiện của chúng tôi có thể được tìm thấy ở đây</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
