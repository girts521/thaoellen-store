import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './index.module.scss'

const NavBar: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  useEffect(() => {
    // Close the burger menu when the screen width is less than a certain threshold (e.g., 768px)
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsBurgerMenuOpen(false)
      }
    }

    // Attach the event listener to the window's resize event
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.desktop} ${styles.h1}`}>Thao</h1>
        <h2 className={`${styles.desktop} ${styles.h2}`}>Nước hoa</h2>
        <h2 className={`${styles.desktop} ${styles.h2}`}>Mỹ phẩm</h2>
        <h2 className={`${styles.desktop} ${styles.h2}`}>Vitamin</h2>
        <h2 className={`${styles.desktop} ${styles.h2}`}>hơi già</h2>

        <div className={styles.imagecontainer}>
          <Image
            className={styles.mobile}
            onClick={handleBurgerMenuClick}
            src={isBurgerMenuOpen ? '/Close.png' : '/Burger.png'}
            alt="Burger menu"
            width={25}
            height={25}
          />

          <Image src="/bag.png" alt="shopping menu" width={25} height={25} />
        </div>
      </div>

      <div
        className={`${styles.burgerMenuContent}`}
        style={{ height: isBurgerMenuOpen ? '100%' : 0 }}
      >
        <Image
          className={styles.mFlowerRight}
          src="/m-flower-left.png"
          alt="Background flower image"
          width={200}
          height={250}
        />
        <Image
          className={styles.mFlowerLeft}
          src="/m-flower-left.png"
          alt="Background flower image"
          width={200}
          height={250}
        />

        {isBurgerMenuOpen && (
          <div>
            <div className={styles.imagecontainer}>
              <Image
                className={styles.mobile}
                onClick={handleBurgerMenuClick}
                src={isBurgerMenuOpen ? '/Close.png' : '/Burger.png'}
                alt="Burger menu"
                width={25}
                height={25}
              />
            </div>
            <div>
              <h2 className={styles.h1}>Thao Ellen Store</h2>
              <h2 className={styles.h2}>Nước hoa</h2>
              <h2 className={styles.h2}>Mỹ phẩm</h2>
              <h2 className={styles.h2}>Vitamin</h2>
              <h2 className={styles.h2}>hơi già</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default NavBar
