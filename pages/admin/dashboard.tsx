import Layout from 'components/BlogLayout'
import { admin } from 'lib/firebaseAdmin'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { signOutUser, getOrders } from 'lib/firebase'

import styles from './dashboard.module.scss'
// import EmailForm from 'components/EmailForm'

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const cookies = context.req.headers.cookie
//     const token = cookies
//       ? cookies
//           .split('; ')
//           .find((c) => c.startsWith('authToken='))
//           .split('=')[1]
//       : null
//     // console.log('headers: ', context.req.headers)
//     // console.log('token in dashboard:', token)
//     // console.log('cookies: ', cookies)
//     const decodedToken = await admin.auth().verifyIdToken(token)

//     if (
//       decodedToken.uid === process.env.ADMIN_UID ||
//       decodedToken.uid === process.env.ADMIN_UID_2
//     ) {
//       return { props: { token } }
//     } else {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       }
//     }
//   } catch (error) {
//     console.log('Server-side verification failed', error)
//     return {
//       props: {},
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
// }

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [decryptedOrders, setDecryptedOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    console.log('orders: ', orders)
    // fetch post decrypt

    fetch('/api/decrypt', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orders }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDecryptedOrders(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [orders, token])

  const convertDate = (date) => {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000
    const dateObj = new Date(milliseconds)
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Month is 0-indexed
    const year = dateObj.getFullYear()
    const formattedDate = `${day}.${month}.${year}`
    return formattedDate
  }

  return (
    <Layout preview={false} loading={false}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.userName}>Order ID</th>
            <th className={styles.userName}>Name</th>
            <th className={styles.userSurname}>Surname</th>
            <th className={styles.userEmail}>Email</th>
            <th className={styles.userPhone}>Phone number</th>
            <th className={styles.userPhone}>Address</th>
            <th className={styles.userPhone}>Order date</th>
            <th className={styles.userPhone}>Cart</th>
          </tr>
        </thead>
        <tbody>
          {decryptedOrders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.surname}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{convertDate(order.dateAdded)}</td>
                <td>{order.cart}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>

      <button className={styles.button} onClick={() => signOutUser()}>Sign Out</button>
    </Layout>
  )
}

export default Dashboard
