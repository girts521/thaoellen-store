import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'lib/firebase';

const GoogleAuthButton = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user);
      // Handle additional tasks after successful sign in, if needed
    } catch (error) {
      console.error('Error during Google sign in:', error);
      // Handle errors here
    }
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default GoogleAuthButton;
