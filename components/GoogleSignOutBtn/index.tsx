import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import {auth} from 'lib/firebase'


const SignOutButton = () => {
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out successful")
      })
      .catch((error) => {
        // An error happened.
        console.log(`Error ${error}`)
      })
  }

  return <button onClick={signOutUser}>Sign Out</button>
}

export default SignOutButton
