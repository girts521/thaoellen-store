// components/FacebookLogin.tsx
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from 'lib/firebase'
import React, { useState } from "react";
import { UserCredential } from "firebase/auth";

interface FacebookLoginProps {
  onSuccess: (user: UserCredential) => void;
}

const FacebookLogin: React.FC<FacebookLoginProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onSuccess(result);
    } catch (error) {
      console.error("Error during Facebook login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFacebookLogin}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? "Logging in..." : "Log in with Facebook"}
    </button>
  );
};

export default FacebookLogin;