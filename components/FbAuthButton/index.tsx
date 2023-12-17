import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, fbProvider } from 'lib/firebase';

const FbAuthButton = () => {
  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const user = result.user;
      console.log('Signed in user:', user);
      // Handle additional tasks after successful sign in, if needed
    } catch (error) {
      console.error('Error during Google sign in:', error);
      // Handle errors here
    }
  };

  return (
    <button onClick={signInWithFacebook}>Sign in with Facebook</button>
  );
};

export default FbAuthButton;
