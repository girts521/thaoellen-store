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
        <h1 className={styles.heading}>Thank you for your order!!!</h1>
        <h2 className={styles.orderID}>Số đơn hàng của bạn là: {order_id}</h2>
        <p className={styles.text}>
          Chúng tôi sẽ sớm liên hệ với bạn về thông tin chi tiết đơn hàng và phương thức thanh toán.{' '}
          <br /> <br /> Bạn có thể đẩy nhanh quá trình này bằng cách liên hệ trực tiếp với chúng tôi ngay
          bây giờ!
        </p>
        <a target='blank' href={`https://m.me/NguyenThiThachThao95/?text=Hey, I have some questions about my order with id: ${order_id}.`}>
        <button className={styles.contact}>Liên hệ để mua</button>
        </a>
      </div>
    </Layout>
  )
}

export default Order
