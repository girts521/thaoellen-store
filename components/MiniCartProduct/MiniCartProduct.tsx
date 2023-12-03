import styles from './MiniCartProduct.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { urlForImage } from 'lib/sanity.image'

const MiniCartProduct = ({product, quantity, setCart}) => {

    const [quantityState, setQuantity] = useState(quantity)

    const decreaseQuantity = () => {
        console.log('decreaseQuantity')
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const itemIndex = cartArray.findIndex(item => item.product_id === product[0].product_id.current)
            if (itemIndex !== -1) {
                cartArray[itemIndex].quantity = cartArray[itemIndex].quantity - 1
                setQuantity(cartArray[itemIndex].quantity)
                localStorage.setItem('cart', JSON.stringify(cartArray))
                setCart(cartArray)

            }
        }
    }

    const increaseQuantity = () => {
        console.log('increaseQuantity')
        const cart = localStorage.getItem('cart')
        if (cart) {
            const cartArray = JSON.parse(cart)
            const itemIndex = cartArray.findIndex(item => item.product_id === product[0].product_id.current)
            if (itemIndex !== -1) {
                cartArray[itemIndex].quantity = cartArray[itemIndex].quantity + 1
                setQuantity(cartArray[itemIndex].quantity)
                localStorage.setItem('cart', JSON.stringify(cartArray))
                setCart(cartArray)
            }
        }
    }



  return (
    <li>
      <div className={styles.product}>
        <div className={styles.productImage}>
          {/* <Image src="/gucci.png" alt="product" width={150} height={150} /> */}
            <Image src={urlForImage(product[0].coverImage).url()} alt="product" width={150} height={150} />
          
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <h3>{product[0].title}</h3>
          </div>

          <div className={styles.productPrice}>
            Price: <p>{product[0].price}</p>
          </div>

          <h3>Quantity</h3>
          <div className={styles.productQuantity}>
            <button className={styles.quantityButton} onClick={() => {
                decreaseQuantity()
            }} >-</button>
            <input className={styles.quantityInput} value={quantityState} type="number" />
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