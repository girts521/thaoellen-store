import Layout from 'components/BlogLayout'
import styles from './Checkout.module.scss'
import { useRouter } from 'next/router'
import Notification from 'components/Notification'
import { useState } from 'react'
import { redirect } from 'next/dist/server/api-utils'

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
      setNotificationText('Vui lòng điền đầy đủ thông tin!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    if (!validatePhoneNumber(phone.value)) {
      setNotificationText('Số điện thoại không hợp lệ!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    if (!validateEmail(email.value)) {
      setNotificationText('Email không hợp lệ!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart || cart.length === 0) {
      setNotificationText('Giỏ hàng của bạn đang trống!')
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
        if (data.id) {
          //erase local storage cart
          localStorage.setItem('cart', JSON.stringify([]))
          //redirect to /order/[id] page
          router.push(`/order/${data.id}`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const contact = (e) => {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart || cart.length === 0) {
      window.open(
        `https://m.me/111098168639376/?text=Hey, I am interested in some of your products. Can you please tell me more?`,
        '_blank',
      )
      return
    } else {
      let message = ''
      cart.forEach((item) => {
        message += `${item.quantity} x ${item.product_id}, `
      })
     
      window.open(
        `https://m.me/111098168639376/?text=Hey, I am interested in ${cart.length > 1 ? 'these products' : 'this product'}: ${message} Can you please tell me more?`,
        '_blank',
      )
    }
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
            <label htmlFor="phone">Điện thoại</label>
            <input id="phone" type="text" />
          </div>

          <div className={styles.input}>
            <label htmlFor="address">Địa chỉ</label>
            <textarea id="address" />
          </div>

          <div className={styles.action}>
          <button type="submit" className={styles.submit}>
          Đặt hàng
          </button>

          <button onClick={contact}>Liên hệ để mua</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Checkout
