import styles from './Order.module.scss'
import { useRouter } from 'next/router'
import Layout from 'components/BlogLayout'
import Link from 'next/link'

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
        <p className={styles.text}>
        Quý khách có thể vui lòng chọn chuyển khoản trước để tránh bị thu cước
        của bưu điện như khi chọn thu hộ ( Ship COD) nhé 😉
        <br />
        <br />
        <b>LƯU Ý KHI CHUYỂN KHOẢN:</b> Copy mã số đơn hàng vào phần “ Nội dung
        chuyển khoản” ở Online Banking khi chuyển khoản để Thạch Thảo biết là
        quý khách đã thanh toán nhé!
        <br />
        <br />
        <b>Số tài khoản:</b> 0354948095 
        <br />
        Tên chủ TK: Nguyễn Thị Thạch Thảo
        <br />
        Ngân hàng: BIDV chi nhánh Đaklak.
        <br />
        <br />
        Quý khách vẫn có thể thoải mái chọn thu hộ nếu không muốn chuyển khoản
        trước nhé 😊. 
        <br />
        Sau khi chuyển khoản xong quý khách vui lòng nhắn tin
        thông báo cho Thảo biết <a target='blank' href={`https://m.me/NguyenThiThachThao95/?text=Xin chào, tôi đã chuyển khoản cho số đơn hàng: ${order_id}`}>tại đây</a> nhé. Xin cảm ơn quý khách!
        </p>
        <a target='blank' href={`https://m.me/NguyenThiThachThao95/?text=Chào bạn, mình có một vài câu hỏi về đơn hàng với mã số: ${order_id}.`}>
        <button className={styles.contact}>Liên hệ để mua</button>
        </a>
      </div>
    </Layout>
  )
}

export default Order
