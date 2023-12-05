import Layout from 'components/BlogLayout'
import styles from './Checkout.module.scss'

const checkout = () => {
  return (
    <Layout preview={false} loading={false}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Checkout</h1>
        <form action="">
          <div className={styles.input}>
            <label htmlFor="name">Tên</label>
            <input id="name" type="text"  />
          </div>

          <div className={styles.input}>
            <label htmlFor="name">Họ</label>
            <input id="surname" type="text"  />
          </div>


          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input id="email" type="Email"  />
          </div>

          <div className={styles.input}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text"  />
          </div>

          <div className={styles.input}>
            <label htmlFor="address">Address</label>
            <textarea id="address"   />
          </div>

          <button type="submit" className={styles.submit}>Order</button>
          <button>Contact</button>
        </form>

       
      </div>
    </Layout>
  )
}

export default checkout
