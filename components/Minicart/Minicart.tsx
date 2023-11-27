import styles from './Minicart.module.scss'
import Image from 'next/image'

const Minicart = ({close}) => {
  return (
    <div className={styles.minicartContainer}>

        <div onClick={() => {
            close(false)
        }}>
            <button className={styles.closeButton}>X</button>
        </div>


      <div className={styles.title}>
        <h2>Your Cart</h2>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.totals}>
          <div className={styles.itemCount}> 1 items in cart</div>
          <div className={styles.subtotal}>
            <p>Subtotal :</p> 20$
          </div>

          <div className={styles.dicount}>
            <p>Discount :</p> 0$
          </div>

          <div className={styles.total}>
            <p>Total :</p> 20$
          </div>
        </div>

        <div className={styles.discountContainer}>
          <div className={styles.discountTitle}>
            <h2>Discount Code</h2>
          </div>

          <div className={styles.discountInput}>
            <input type="text" placeholder="Enter your code here" />
            <div className={styles.discountButton}>
              <button>Apply</button>
            </div>
          </div>
        </div>

        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutButton}>
            <button>Checkout</button>
          </div>
        </div>
        <hr />
        {/* Items list */}

        <div className={styles.itemsContainer}>
          <ol>
            <li>
              <div className={styles.product}>
                <div className={styles.productImage}>
                  <Image
                    src="/gucci.png"
                    alt="product"
                    width={150}
                    height={150}
                  />
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productName}>
                    <h3>Product name</h3>
                  </div>

                  <div className={styles.productPrice}>
                    Price: <p>20$</p>
                  </div>

                  <h3>Quantity</h3>
                  <div className={styles.productQuantity}>
                    <button className={styles.quantityButton}>-</button>
                    <input className={styles.quantityInput} type="number" />
                    <button className={styles.quantityButton}>+</button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Minicart
