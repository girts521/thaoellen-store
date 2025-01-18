import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { auth } from 'lib/firebase'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'


const SignOutButton = () => {
  const router = useRouter()

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push('/')
        console.log('Sign out successful')
        
      })
      .catch((error) => {
        // An error happened.
        console.log(`Error ${error}`)
      })
  }

  return (
    <Box
    sx={{
      display:'flex',
      width: '100%',
      marginTop: '24px'
    }}
    >
      <Button
        variant="contained"
        size='large'
        // color='primary'
        onClick={signOutUser}
        sx={{
          margin: 'auto',
          backgroundColor:'#dbdbe7 !important',
          border: '1px solid #474574',
        color: '#474574'
        }}
      >
        Logout
      </Button>
    </Box>
  )
}

export default SignOutButton
