import styles from './MiniCartProduct.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { urlForImage } from 'lib/sanity.image'

const MiniCartProduct = ({product, quantity, setCart}) => {

    const [quantityState, setQuantity] = useState(quantity)

    const deleteItem = () => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const newCart = cartArray.filter(item => item.product_id !== product[0].product_id.current)
            localStorage.setItem('cart', JSON.stringify(newCart))
            window.dispatchEvent(new Event('localStorageCartChanged'));
            setCart(newCart)
        }
    }

    const updateValue = (e) => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const itemIndex = cartArray.findIndex(item => item.product_id === product[0].product_id.current)
            if (itemIndex !== -1) {
                if (e.target.value < 1) {
                    e.target.value = 1
                }
                cartArray[itemIndex].quantity = parseInt(e.target.value)
                setQuantity(cartArray[itemIndex].quantity)
                localStorage.setItem('cart', JSON.stringify(cartArray))
                window.dispatchEvent(new Event('localStorageCartChanged'));
                console.log('dispatched')
                setCart(cartArray)
            }
        }
    }

    const decreaseQuantity = () => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const itemIndex = cartArray.findIndex(item => item.product_id === product[0].product_id.current)
            if (itemIndex !== -1) {

                cartArray[itemIndex].quantity = cartArray[itemIndex].quantity - 1
                if (cartArray[itemIndex].quantity < 1) {
                    cartArray.splice(itemIndex, 1)
                } else {
                  setQuantity(cartArray[itemIndex].quantity)
                }
                localStorage.setItem('cart', JSON.stringify(cartArray))
                window.dispatchEvent(new Event('localStorageCartChanged'));
                console.log('dispatched')
                setCart(cartArray)

            }
        }
    }

    const increaseQuantity = () => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const itemIndex = cartArray.findIndex(item => item.product_id === product[0].product_id.current)
            if (itemIndex !== -1) {
                cartArray[itemIndex].quantity = cartArray[itemIndex].quantity + 1
                setQuantity(cartArray[itemIndex].quantity)
                localStorage.setItem('cart', JSON.stringify(cartArray))
                window.dispatchEvent(new Event('localStorageCartChanged'));
                console.log('dispatched')
                setCart(cartArray)
            }
        }
    }

  return (
    <li>
      <div className={styles.product}>
        <div className={styles.productImage}>
          {/* <Image src="/gucci.png" alt="product" width={150} height={150} /> */}
            <Image src={urlForImage(product[0].coverImage[0]).url()} alt="product" width={150} height={150} />
          
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <h3>{product[0].title}</h3>
          </div>

          <div className={styles.productPrice}>
          Giá: <p>{product[0].price} VND</p>
          </div>

          <h3>Số lượng</h3>
          <div className={styles.productQuantity}>
            <button className={styles.quantityButton} onClick={() => {
                decreaseQuantity()
            }} >-</button>
            <input className={styles.quantityInput} onChange={updateValue} min={0} value={quantityState} type="number" />
            <button className={styles.quantityButton} onClick={() => {
                increaseQuantity()
            }} >+</button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MiniCartProduct