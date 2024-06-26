import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import Minicart from 'components/Minicart/Minicart'
import Rive from '@rive-app/react-canvas'
import { useRouter } from 'next/router'

const NavBar: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [minicart, setMinicart] = useState(false)

  const router = useRouter()

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBurgerMenuOpen])

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
        <h1
          className={`${styles.desktop} ${styles.h1}`}
          onClick={() => {
            router.push('/')
          }}
        >
          Thao
        </h1>
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
            width={35}
            height={45}
          />

          <div
            style={{ width: '75px', height: '75px', cursor: 'pointer' }}
            onClick={() => {
              setMinicart(true)
            }}
            onTouchStart={() => {
              setMinicart(true)
            }}
          >
            <Rive
              src="/animations/cart_animation.riv"
              stateMachines={['State Machine 1']}
              style={{ width: '70px', height: '70px', cursor: 'pointer' }}
            />
          </div>

          {/* <Image
          onClick={() => {
            console.log('click', minicart)
            setMinicart(true)
          }}
          src="/bag.png" alt="shopping menu" width={25} height={25} /> */}
        </div>
      </div>

      {minicart && <Minicart close={setMinicart} />}

      <div
        className={`${styles.burgerMenuContent}`}
        style={{ height: isBurgerMenuOpen ? '100%' : 0 }}
      >
        <Image
          className={styles.mFlowerRight}
          src="/d-flower-left.png"
          alt="Background flower image"
          width={200}
          height={250}
        />
        <Image
          className={styles.mFlowerLeft}
          src="/d-flower-left.png"
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
                width={35}
                height={45}
              />
            </div>
            <div>
              <h2
                className={styles.h1}
                onClick={() => {
                  router.push('/')
                }}
              >
                Thao Ellen Store
              </h2>
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
