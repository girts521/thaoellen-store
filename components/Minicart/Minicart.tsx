import MiniCartProduct from 'components/MiniCartProduct/MiniCartProduct'
import styles from './Minicart.module.scss'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import Loading from 'components/Loading/Loading'
import { set } from 'date-fns'
import { useCallback } from 'react'


const Minicart = ({ close }) => {
  const [cart, setCart] = useState([])
  const [cartLength, setCartLength] = useState(0)
  const [cartDB, setCartDB] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  


const cartDBref = useRef(cartDB)
  cartDBref.current = cartDB

  const findQuantity = useCallback((item) => {
    const quantity = cart.find((cartItem) => cartItem.product_id === item[0].product_id.current);
    return quantity ? quantity.quantity : 0;
  }, [cart]);


  useEffect(() => {
    let localCart
    localCart = localStorage.getItem('cart')
    if (localCart) {
      setCart(JSON.parse(localCart))
    }

    const handleStorageChange = (e) => {
      localCart = localStorage.getItem('cart')
      if (localCart) {
        setCart(JSON.parse(localCart))
        //remove item from cartDB if it's not in localCart
      
        const newCartDB = cartDBref.current.filter(item => {
          const isExist = JSON.parse(localCart).find(cartItem => cartItem.product_id === item[0].product_id.current)
          return isExist
        })
        setCartDB(newCartDB)

      }
      // setCart(JSON.parse(e.detail))
    }

    window.addEventListener('localStorageCartChanged', handleStorageChange);

  return () => {
    window.removeEventListener('localStorageCartChanged', handleStorageChange);
  };
  }, [])



  useEffect(() => {


    const calculateTotalPrice = () => {
      const totalPriceCalc = cartDB.reduce((acc, item) => {
        const price = item[0].price * findQuantity(item)
        return acc + price
      }, 0)    
      setTotalPrice(totalPriceCalc)
    }

    console.log('effect')
    if (cart.length) {
      const length = cart.reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
      setCartLength(length)

      const fetchCartItems = async (productId) => { 
        try {
          const response = await fetch(`/api/getProductById?id=${productId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const data = await response.json()
          //check if cardDB has the item, if not add it
          const isExist = cartDB.find(
            (item) => item.product_id === data.product_id,
          )
          if (isExist) {
            return
          } else {
            setCartDB((prev) => [...prev, data])
          }
          
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error)
        }

      }

      //loop through cart and fetch each item from DB and add to cartDB state
      //await for all fetch to finish in a promise and change loading state to false
      
      setLoading(true)
      Promise.all(cart.map(item => fetchCartItems(item.product_id)))
      .then(() => {
        console.log('done', cartDB)
        //calsulate total price
        calculateTotalPrice()
        setLoading(false)
      })
      .catch(err => {
        console.log('err: ', err)
        setLoading(false)
      })

    }
  }, [cart, cartDB, findQuantity])




  return (
    <div className={styles.minicartContainer}>
      <div
        onClick={() => {
          close(false)
        }}
      >
        <button className={styles.closeButton}>X</button>
      </div>

      <div className={styles.title}>
        <h2>Your Cart</h2>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.totals}>
          <div className={styles.itemCount}> {cartLength} items in cart</div>
          <div className={styles.subtotal}>
            <p>Subtotal :</p> {totalPrice}$
          </div>

          <div className={styles.dicount}>
            <p>Discount :</p> {discount}
          </div>

          <div className={styles.total}>
            <p>Total :</p> {totalPrice - discount}$
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
            <button
              onClick={() => {
                console.log('click')
                console.log(cartDB)
              }}
            >
              Checkout
            </button>
          </div>
        </div>
        <hr />
        {/* Items list */}

        <div className={styles.itemsContainer}>
          {loading && <Loading />}
          <ol>
            {
              // cartDB.length &&
              cartDB.sort((a, b) => {
                //based on the title alphabetically
                const titleA = a[0].title.toUpperCase()
                const titleB = b[0].title.toUpperCase()
                if (titleA < titleB) {
                  return -1
                }
                if (titleA > titleB) {
                  return 1
                }
                return 0
              })
              .map((item) => {
                return <MiniCartProduct key={item[0].product_id.current} product={item} quantity={findQuantity(item)} setCart={setCart} />
              })
            }
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Minicart
