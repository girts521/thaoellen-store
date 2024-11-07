import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import Minicart from 'components/Minicart/Minicart'
import { useRouter } from 'next/router'

const NavBar: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [minicart, setMinicart] = useState(false)
  const [vitaminTitle, setVitaminTitle] = useState(null)
  const [nuocTitle, setNuocTitle] = useState(null)
  const [phamTitle, setPhamTitle] = useState(null)
  const [hoiTitle, setHoiTitle] = useState(null)

  const router = useRouter()

  const handleBurgerMenuClick = () => {
   
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  const closeMinicart = () => {
  document.querySelector("body").style.overflow = "auto"
    setIsBurgerMenuOpen(false);
    setMinicart(false);
  }

  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isBurgerMenuOpen])

  useEffect(() => {
    // Close the burger menu when the screen width is less than a certain threshold (e.g., 768px)
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsBurgerMenuOpen(false)
      }
    }
    setVitaminTitle(
      document.querySelector(
        '#__next > div > main > div > section:nth-child(5) > h2',
      ),
    )
    setNuocTitle(
      document.querySelector(
        '#__next > div > main > div > section:nth-child(2) > h2',
      ),
    )
    setPhamTitle(
      document.querySelector(
        '#__next > div > main > div > section:nth-child(3) > h2',
      ),
    )
    setHoiTitle(
      Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Trẻ em'))
    )

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
        <h3
          onClick={() => {
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Vitamin &amp; More")).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Vitamin &amp; More")).scrollIntoView({ behavior: 'smooth' })
            }           }}
          className={`${styles.desktop} ${styles.h2}`}
        >
          Vitamin & More
        </h3>
        <h3
          onClick={() => {
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Phụ nữ')).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Phụ nữ')).scrollIntoView({ behavior: 'smooth' })
            }  
          }}
          className={`${styles.desktop} ${styles.h2}`}
        >
          Phụ nữ
        </h3>
        <h3
          onClick={() => {
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Trẻ em')).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Trẻ em')).scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className={`${styles.desktop} ${styles.h2}`}
        >
          Trẻ em
        </h3>
        <h3
          onClick={() => {
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Nước hoa')).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Nước hoa')).scrollIntoView({ behavior: 'smooth' })
            }          
          }}
          className={`${styles.desktop} ${styles.h2}`}
        >
          Nước hoa
        </h3>

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
            style={{ padding: '12px', cursor: 'pointer' }}
            onClick={() => {
              if (window.screen.width < 600){
                document.querySelector("body").style.overflow = "hidden"
              }
              setMinicart(true)
            }}
            onTouchStart={() => {
              if (window.screen.width < 600){
                document.querySelector("body").style.overflow = "hidden"
              }
              setMinicart(true)
            }}
          >
            <Image
              // className={styles.mobile}
              // onClick={handleBurgerMenuClick}
              src={'/cart.png'}
              alt="Open mini-cart"
              width={35}
              height={45}
            />

            {/* <a href="https://www.flaticon.com/free-icons/shopping-bag" title="shopping bag icons">Shopping bag icons created by Abiyoga Pratama - Flaticon</a> */}
          </div>

          {/* <Image
          onClick={() => {
            console.log('click', minicart)
            setMinicart(true)
          }}
          src="/bag.png" alt="shopping menu" width={25} height={25} /> */}
        </div>
      </div>

      {minicart && <Minicart close={closeMinicart} />}

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
                  handleBurgerMenuClick();
                  router.push('/')
                }}
              >
                Thach Thao German Store
              </h2>
              <h3
          onClick={() => {
            handleBurgerMenuClick();
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Vitamin &amp; More")).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Vitamin &amp; More")).scrollIntoView({ behavior: 'smooth' })
            }           }}
          className={`${styles.h2}`}
        >
          Vitamin & More
        </h3>

        <h3
          onClick={() => {
            handleBurgerMenuClick();
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Phụ nữ')).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Phụ nữ')).scrollIntoView({ behavior: 'smooth' })
            }  
          }}
          className={`${styles.h2}`}
        >
          Phụ nữ
        </h3>

        <h3
          onClick={() => {
            handleBurgerMenuClick();
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Trẻ em")).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes("Trẻ em")).scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className={`${styles.h2}`}
        >
          Trẻ em
        </h3>

              <h3
          onClick={() => {
            handleBurgerMenuClick();
            if (router.pathname != '/') {
              router.push('/')
              setTimeout(() => {
                Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Nước hoa')).scrollIntoView({ behavior: 'smooth' })
              }, 500)
            } else {
              Array.from(document.querySelectorAll('h2')).find(el => el.innerHTML.includes('Nước hoa')).scrollIntoView({ behavior: 'smooth' })
            }          
          }}
          className={`${styles.h2}`}
        >
          Nước hoa
        </h3>



            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default NavBar
