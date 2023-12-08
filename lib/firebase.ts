import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, where,doc,getDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID
};

// Initialize Firebase

let db
let auth
let app

if (!getApps().length) {
 app = initializeApp(firebaseConfig)
 auth = getAuth(app)
 db = getFirestore(app)
//  const analytics = getAnalytics(app);
}

if (auth) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      console.log("User is signed in:", user);
    } else {
      // User is signed out.
      console.log("User is signed out");
    }
  });
}


export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    return {user: user, error: null}
  } catch (error) {
    console.log(error)
    return {user: null, error: error}
  }
}


export async function signOutUser () {

  try {
    await signOut(auth);
    // Sign-out successful
    await fetch('/api/signOut', {
      method: 'POST'
    });
    window.location.href = '/';
    return true


  } catch (error) {
    // An error happened.
    console.error(error);
  }
};

export async function getToken() {
  const token = await auth.currentUser.getIdToken()
  return token
}

export async function getSplineDataByProductId(product_id) {
  try {
    console.log("productId: ", product_id);
    const docRef = doc(db, 'spline', product_id); // Reference to the document
    const docSnapshot = await getDoc(docRef); // Get the document
    console.log("docSnapshot: ", docSnapshot);

    if (!docSnapshot.exists()) {
      console.log('No matching document.');
      return null;
    }

    return { id: docSnapshot.id, link: docSnapshot.data().link }; // Returns the matching document data
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};

export async function getOrders() {
  const ordersCol = collection(db, 'orders');
  const ordersSnapshot = await getDocs(ordersCol);
  const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return ordersList;
}

