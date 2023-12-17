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

export default function PerfumeBody({ content, price, title, product_id }) {

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
        setNotificationText('Product quantity successfully increased')
        setTimeout(() => {
          setNotification(false)
        }, 3000)
      } else {
        cartObj.push({ product_id, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(cartObj))
        window.dispatchEvent(new Event('localStorageCartChanged'));
        console.log('dispatched')

        setNotification(true)
        setNotificationText('Product successfully added to cart ')
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
      setNotificationText('Product successfully added to cart ')
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
      <div className={styles.price}>Price: {`${price}`}</div>
      <div className={styles.action}>
        <button onClick={addToCart} className={styles.addToCart}>
          {' '}
          <Image
            src={'/bag.png'}
            width={1000}
            height={1000}
            alt="product image"
          />{' '}
          Add to cart
        </button>
        <a target='blank' href={`https://m.me/111098168639376/?text=Hey, I am interested in this product: ${title}. Can you please tell me more?`}>
        <button className={styles.contact}>
         
          <Image
            src={'/contact.png'}
            width={1000}
            height={1000}
            alt="product image"
          />
          Contact to buy
       
        </button>
        </a>
      </div>
    </div>
  )
}
