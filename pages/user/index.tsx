import Layout from 'components/BlogLayout'
import SignOutButton from 'components/GoogleSignOutBtn'
import styles from './index.module.scss'
import Image from 'next/image'
import { auth } from 'lib/firebase'
import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Divider from '@mui/material/Divider'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useRouter } from 'next/router'

import UserForm from 'components/UserForm'
import Notification from 'components/Notification'

const UserPage: React.FC = () => {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [editAddress, setEditAddress] = useState(false)
  const [addressState, setAddressState] = useState(true)
  const [editEmail, setEditEmail] = useState(false)
  const [emailState, setEmailState] = useState(true)
  const [editPhone, setEditPhone] = useState(false)
  const [phoneState, setPhoneState] = useState(true)
  const [facebookState, setFacebookState] = useState(true)
  const [editFacebook, setEditFacebook] = useState(false)

  const [showNotification, setNotification] = useState(false)

  const addressRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser) // Update local user state
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
            setDbUser(data.user)
            console.log(data.user)
            // Update state with zackend user data if needed
          })
          .catch((error) => {
            console.error('Error fetching user data:', error)
            router.push('/')
          })
      } else {
        router.push('/')
      }
    })
    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  return (
    <>
      <Layout preview={false} loading={false}>
        {showNotification && (
          <Notification
            text={
              'Rất tiếc, tính năng này vẫn đang trong quá trình hoàn thiện. Hãy kiểm tra lại sau!'
            }
          />
        )}
        {user && (
          <>
            <Box
              sx={{
                marginTop: '15%',
                width: '100%',
                // maxWidth: 500,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  textAlign: 'center',
                }}
              >
                Welcome {user.displayName}
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: '5%',
                width: '100vw',
                // maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: '70%',
                  // maxWidth: 500,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <MenuList
                  sx={{
                    width: '100%',
                  }}
                >
                  <UserForm
                    text={dbUser && dbUser.address ? dbUser.address : null}
                    field="Địa chỉ"
                    enField="address"
                    state={addressState}
                    edit={editAddress}
                    setEdit={setEditAddress}
                    setState={setAddressState}
                    icon={<HomeIcon fontSize="small" />}
                  />
                  <Divider />

                  <UserForm
                    text={dbUser && dbUser.email ? dbUser.email : null}
                    field="Email"
                    enField="email"
                    state={emailState}
                    edit={editEmail}
                    setEdit={setEditEmail}
                    setState={setEmailState}
                    icon={<EmailIcon fontSize="small" />}
                  />

                  <Divider />

                  <UserForm
                    text={dbUser && dbUser.phone ? dbUser.phone : null}
                    field="Điện thoại"
                    enField="phone"
                    state={phoneState}
                    edit={editPhone}
                    setEdit={setEditPhone}
                    setState={setPhoneState}
                    icon={<PhoneIcon fontSize="small" />}
                  />

                  <Divider />

                  <UserForm
                    text={dbUser && dbUser.facebook ? dbUser.facebook : null}
                    field="Facebook"
                    enField="facebook"
                    state={facebookState}
                    edit={editFacebook}
                    setEdit={setEditFacebook}
                    setState={setFacebookState}
                    icon={<PhoneIcon fontSize="small" />}
                  />
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setNotification(true)
                      setTimeout(() => {
                        setNotification(false)
                      }, 5000)
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingCartCheckoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Orders</ListItemText>
                    {dbUser && dbUser.orders && (
                      <ListItemText>{dbUser.orders}</ListItemText>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Box>
          </>
        )}
        <SignOutButton />
      </Layout>
    </>
  )
}

export default UserPage
