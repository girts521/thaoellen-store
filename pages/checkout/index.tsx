import Layout from 'components/BlogLayout'
import styles from './Checkout.module.scss'
import { useRouter } from 'next/router'
import Notification from 'components/Notification'
import { useState } from 'react'

const Checkout = () => {
  const router = useRouter()
  const [notification, setNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  function validatePhoneNumber(phoneNumber) {
    // German phone numbers (country code optional)
    const germanPattern = /^(?:\+49|0049|0)?[1-9][0-9]{4,14}$/

    // Vietnamese phone numbers (country code optional)
    const vietnamesePattern = /^(?:\+84|0084|0)?[1-9][0-9]{7,9}$/

    return (
      germanPattern.test(phoneNumber) || vietnamesePattern.test(phoneNumber)
    )
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, surname, email, phone, address } = e.target

    if (
      !name.value ||
      !surname.value ||
      !email.value ||
      !phone.value ||
      !address.value
    ) {
      setNotificationText('Please fill all fields!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    if (!validatePhoneNumber(phone.value)) {
      setNotificationText('Invalid phone number!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    if (!validateEmail(email.value)) {
      setNotificationText('Invalid email!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart || cart.length === 0) {
      setNotificationText('Your cart is empty!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    //send data to /api/createOrder as POST request
    fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        cart,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        //erase local storage cart
        localStorage.setItem('cart', JSON.stringify([]))
        //redirect to /order/[id] page
        router.push(`/order/${data.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout preview={false} loading={false}>
      <div className={styles.container}>
        {notification && <Notification text={notificationText} />}
        <h1 className={styles.heading}>Checkout</h1>
        <form onSubmit={onSubmit} action="">
          <div className={styles.input}>
            <label htmlFor="name">Tên</label>
            <input id="name" type="text" />
          </div>

          <div className={styles.input}>
            <label htmlFor="surname">Họ</label>
            <input id="surname" type="text" />
          </div>

          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input id="email" type="Email" />
          </div>

          <div className={styles.input}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" />
          </div>

          <div className={styles.input}>
            <label htmlFor="address">Address</label>
            <textarea id="address" />
          </div>

          <button type="submit" className={styles.submit}>
            Order
          </button>
          <button>Contact</button>
        </form>
      </div>
    </Layout>
  )
}

export default Checkout
