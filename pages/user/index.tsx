import Layout from 'components/BlogLayout'
import SignOutButton from 'components/GoogleSignOutBtn'
import styles from './index.module.scss'
import Image from 'next/image'
import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'
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

const UserPage: React.FC = () => {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)

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
            console.log('Fetched user data:', data.user)
            setDbUser(data.user)
            // Update state with zackend user data if needed
          })
          .catch((error) => {
            console.error('Error fetching user data:', error)
          })
      }
    })
    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  return (
    <>
      <Layout preview={false} loading={false}>
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
              <Typography variant="h2" gutterBottom>
                Welcome {user.displayName}
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: '5%',
                width: '100vw',
                // maxWidth: 500,
                display: 'flex',
                flexDirection: "column",
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
                  <MenuItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Address</ListItemText>
                    {dbUser && dbUser.address && (
                      <ListItemText>{dbUser.address}</ListItemText>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
                    <ListItemIcon>
                      <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Email</ListItemText>
                    {dbUser && dbUser.email && (
                      <ListItemText>{dbUser.email}</ListItemText>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
                    <ListItemIcon>
                      <PhoneIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Phone</ListItemText>
                    {dbUser && dbUser.phone && (
                      <ListItemText>{dbUser.phone}</ListItemText>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
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
