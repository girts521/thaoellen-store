import Layout from 'components/BlogLayout'
import styles from './Checkout.module.scss'
import { useRouter } from 'next/router'
import Notification from 'components/Notification'
import { useState, useEffect } from 'react'
import { redirect } from 'next/dist/server/api-utils'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link'
import { auth } from 'lib/firebase'
import CheckoutForm from 'components/CheckoutForm'

const Checkout = () => {
  const router = useRouter()
  const [notification, setNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  const [dbUser, setDbUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userFacebook, setUserFacebook] = useState('')
  const [updateInfo, setUpdateInfo] = useState(true)

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken()
        // Fetch user details from backend
        fetch('/api/getUserData', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched user data:', data.user)
            setDbUser(data.user)
            // Update state with backend user data if needed
          })
          .catch((error) => {
            console.error('Error fetching user data:', error)
          })
      }
    })
    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  useEffect(() => {
    if (dbUser && dbUser.displayName) setUserName(dbUser.displayName)
    if (dbUser && dbUser.address) setUserAddress(dbUser.address)
    if (dbUser && dbUser.phone) setUserPhone(dbUser.phone)
    if (dbUser && dbUser.email) setUserEmail(dbUser.email)
    if (dbUser && dbUser.facebook && dbUser.facebook.length) setUserFacebook(dbUser.facebook)
  }, [dbUser])

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
    const { name, surname, email, phone, address, facebook } = e.target

    if (
      !name.value ||
      !email.value ||
      !address.value
    ) {
      setNotificationText('Vui lòng điền đầy đủ thông tin!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)
      }, 5000)
      return
    }

    if (phone.value && !validatePhoneNumber(phone.value)) {
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
    if (dbUser && auth.currentUser && updateInfo)
    {
      [
        {field: 'name', value: name.value},
        {field: 'email', value: email.value},
        {field: 'phone', value: phone.value ? phone.value : ''},
        {field: 'address', value: address.value},
        {field: 'facebook', value: facebook.value ? facebook.value : ''},
      ].forEach((data) => {
        fetch('/api/saveUserInfo', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.currentUser.accessToken}`
          },
          body: JSON.stringify(data)
        })
      })
    }
    //send data to /api/createOrder as POST request
    fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value ? phone.value : '',
        address: address.value,
        facebook: facebook.value ? facebook.value : '',
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
          <CheckoutForm
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            userPhone={userPhone}
            setUserPhone={setUserPhone}
            userFacebook={userFacebook}
            setUserFacebook={setUserFacebook}
          />
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Tôi đồng ý với các điều khoản và điều kiện"
            />
            <Link href="/tos">
              Điều khoản và điều kiện của chúng tôi có thể được tìm thấy ở đây
            </Link>
           {dbUser && (
             <FormControlLabel
             checked={updateInfo}
             control={<Checkbox />}
             onClick={() => {
              setUpdateInfo(!updateInfo)
             }}
             label="Lưu thông tin này vào hồ sơ của tôi"
           />
           )}
          </FormGroup>

          <div className={styles.action}>
            <button type="submit" className={styles.submit}>
              Đặt hàng
            </button>

            <button onClick={contact}>Liên hệ để mua</button>
          </div>
        </form>
        {/* <form onSubmit={onSubmit} action="">
          <div className={styles.input}>
            <label htmlFor="name">Tên</label>
            <input
              id="name"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value)
              }}
              value={userName}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="surname">Họ</label>
            <input id="surname" type="text" />
          </div>

          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="Email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserEmail(event.target.value)
              }}
              value={userEmail}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="phone">Điện thoại</label>
            <input
              id="phone"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserPhone(event.target.value)
              }}
              value={userPhone}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="address">Địa chỉ</label>
            <input id="address" 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserAddress(event.target.value)
            }}
            value={userAddress}
            />
          </div>

          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Tôi đồng ý với các điều khoản và điều kiện"
            />
            <Link href="/tos">
              Điều khoản và điều kiện của chúng tôi có thể được tìm thấy ở đây
            </Link>
          </FormGroup>

          <div className={styles.action}>
            <button type="submit" className={styles.submit}>
              Đặt hàng
            </button>

            <button onClick={contact}>Liên hệ để mua</button>
          </div>
        </form> */}
      </div>
    </Layout>
  )
}

export default Checkout
