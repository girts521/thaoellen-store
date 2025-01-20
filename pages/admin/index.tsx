import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'lib/firebase'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { admin } from 'lib/firebaseAdmin'
import Layout from 'components/BlogLayout'
import styles from './index.module.scss'
import { auth } from 'lib/firebase'


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const cookies = context.req.headers.cookie
//     const token = cookies
//       ? cookies
//           .split('; ')
//           .find((c) => c.startsWith('authToken='))
//           .split('=')[1]
//       : null

//     if (token) {
//       const decodedToken = await admin.auth().verifyIdToken(token)

//       if (decodedToken.uid === process.env.ADMIN_UID || decodedToken.uid === process.env.ADMIN_UID_2) {
//         return {
//           redirect: {
//             destination: '/admin/dashboard',
//             permanent: false,
//           },
//         }
//       } else {
//         return {
//           redirect: {
//             destination: '/',
//             permanent: false,
//           },
//         }
//       }
//     }
//     if (!token) {
//       return { props: {} }
//     }
//   } catch (error) {
//     console.log('Server-side verification failed', error)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
// }

export default function Admin() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMsg, setError] = useState<string>(null)


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
            if(data.user && data.user.isAdmin)
              router.push('/admin/dashboard')
            else
              router.push('/')
          })
          .catch((error) => {
            console.error('Error fetching user data:', error)
            router.push('/')
          })
      }
    })
    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value)
  }

  const handleSignIn = async (email, password) => {
    const result = await signIn(email, password)
    if (result.user && result.error === null) {
      const token = await result.user.getIdToken()
      try {
        const response = await axios.post(
          '/api/verifyAdmin',
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        )

        if (response.status === 200) {
          router.push('/admin/dashboard') // Navigate to the dashboard
        }
      } catch (error) {
        if (error.response.status === 401) {
          setError('You are not authorized to access this page')
        } else {
          console.log('Server-side verification failed', error)
          setError('Something went wrong, check your credentials')
        }
      }
    }
    if (result.error) {
      setError('Something went wrong, check your credentials')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await handleSignIn(email, password)
  }

  return (
    <>
      <Layout preview={false}>
        <h1 className={styles.heading}>Admin login</h1>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input}>
              {' '}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
              />
            </div>
            <div className={styles.input}>
              {' '}
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
              />
            </div>
            <button className={styles.button} onClick={handleSubmit}>
              Sign In
            </button>
          </form>

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>
      </Layout>
    </>
  )
}
