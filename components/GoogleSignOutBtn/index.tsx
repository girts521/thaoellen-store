import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'lib/firebase';

const SignOutButton = () => {
  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Optionally, redirect or update the UI after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={signOutUser}>Sign Out</button>
  );
};

export default SignOutButton;
