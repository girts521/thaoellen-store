/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import styles from './PerfumeBody.module.scss'
import { SanityImage } from './SanityImage'
import Image from 'next/image'
import Notification from 'components/Notification'
import { useState } from 'react'
import { set } from 'date-fns'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PerfumeBody({ content, price, salePrice, title, product_id }) {

const [notification, setNotification] = useState(false)
const [notificationText, setNotificationText] = useState('')

  const addToCart = () => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const cartObj = JSON.parse(cart)
      const isExist = cartObj.find((item) => item.product_id === product_id)
      if (isExist) {
        const newCart = cartObj.map((item) => {
          if (item.product_id === product_id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        window.dispatchEvent(new Event('localStorageCartChanged'));
        console.log('dispatched')
        setNotification(true)
        setNotificationText('Số lượng sản phẩm đã được tăng thành công.')
        setTimeout(() => {
          setNotification(false)
        }, 3000)
      } else {
        cartObj.push({ product_id, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(cartObj))
        window.dispatchEvent(new Event('localStorageCartChanged'));
        console.log('dispatched')

        setNotification(true)
        setNotificationText('Sản phẩm đã được thêm vào giỏ hàng thành công!')
        setTimeout(() => {
          setNotification(false)
        }, 3000)
      }
    } else {
      const cartObj = [{ product_id, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(cartObj))
      window.dispatchEvent(new Event('localStorageCartChanged'));
      console.log('dispatched')

      setNotification(true)
      setNotificationText('Sản phẩm đã được thêm vào giỏ hàng thành công!')
      setTimeout(() => {
        setNotification(false)
      }, 3000)
    }

  }

  return (
    <div className={`${styles.perfumeBody} ${styles.portableText}`}>
      <h2>{title}</h2>
      {notification && <Notification text={notificationText} />}
      <PortableText value={content} components={myPortableTextComponents} />
      {salePrice ? 
        <>
          <div className={styles.oldPrice}>Giá: {`${price}`} 000</div>
          <div className={styles.newPrice}>Giá: {`${salePrice}`} 000</div>
        </>
       :
       <div className={styles.price}>Giá: {`${price}`} 000</div>
      }
      <div className={styles.action}>
        <button onClick={addToCart} className={styles.addToCart}>
          {' '}
          <Image
            src={'/cart.png'}
            width={1000}
            height={1000}
            alt="product image"
          />{' '}
          {/* Add to cart */}
          Thêm vào giỏ hàng
        </button>
        <a target='blank' href={`https://m.me/NguyenThiThachThao95/?text=Chào bạn, mình quan tâm đến sản phẩm: ${title}. Bạn có thể cho mình biết thêm thông tin được không?`}>
        <button className={styles.contact}>
         
          <Image
            src={'/contact.png'}
            width={1000}
            height={1000}
            alt="product image"
          />
          Liên hệ để mua
        </button>
        </a>
      </div>
    </div>
  )
}
