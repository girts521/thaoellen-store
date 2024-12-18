import Layout from 'components/BlogLayout'
import styles from './Checkout.module.scss'
import { useRouter } from 'next/router'
import Notification from 'components/Notification'
import { useState } from 'react'
import { redirect } from 'next/dist/server/api-utils'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link';

const Checkout = () => {
  const router = useRouter()
  const [notification, setNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

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
        `https://m.me/NguyenThiThachThao95/?text=Chào bạn, mình quan tâm đến một số sản phẩm của bạn. Bạn có thể cho mình biết thêm thông tin được không?`,
        '_blank',
      )
      return
    } else {
      let message = ''
      cart.forEach((item) => {
        message += `${item.quantity} x ${item.product_id}, `
      })

      window.open(
        `https://m.me/NguyenThiThachThao95/?text=Chào bạn, mình quan tâm đến sản phẩm: ${message} Bạn có thể cho mình biết thêm thông tin được không?`,
        '_blank',
      )
    }
  }

  return (
    <Layout preview={false} loading={false}>
      <div className={styles.container}>
        {notification && <Notification text={notificationText} />}
        <h1 className={styles.heading}>Thanh toán</h1>
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

          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Tôi đồng ý với các điều khoản và điều kiện"
            />
            <Link href="/tos">Điều khoản và điều kiện của chúng tôi có thể được tìm thấy ở đây</Link>
          </FormGroup>

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
