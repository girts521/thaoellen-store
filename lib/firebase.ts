import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, where,doc,getDoc } from 'firebase/firestore'
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
 db = getFirestore(app)
//  const analytics = getAnalytics(app);
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
