import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, where, } from 'firebase/firestore'
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


export async function getSplineDataByProductId (product_id) {
    try {
        console.log("productId: ",product_id)
      const splineCollection = await collection(db, 'spline')
      console.log("splineCollection: ",splineCollection)
      const q = query(splineCollection, where('product_id', '==', product_id));
      const querySnapshot = await getDocs(q);
        console.log("querySnapshot: ",querySnapshot)
    //   const querySnapshot = await splineCollection.where('product_id', '==', productId).get();
      
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
  
      let splineData = [];
      querySnapshot.forEach(doc => {
        splineData.push({ id: doc.id, ...doc.data() });
      });
  
      return splineData; // Returns an array of matching documents
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null;
    }
  };