import styles from './Order.module.scss'
import { useRouter } from 'next/router'
import Layout from 'components/BlogLayout'

const Order = () => {
  //get order id from url
  const router = useRouter()
  const { order_id } = router.query

  return (
    <Layout preview={false} loading={false}>
      {' '}
      <div className={styles.order}>
        <h1 className={styles.heading}>Thank you!!!</h1>
        <h2 className={styles.orderID}>Your order number is: {order_id}</h2>
        <p className={styles.text}>
          We will contact you soon about your order details and the payment.{' '}
          <br /> <br /> You can speed up this process by contacting us directly right
          now!
        </p>
        <button className={styles.contact}>Contact</button>
      </div>
    </Layout>
  )
}

export default Order
