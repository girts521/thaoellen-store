import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase-admin/auth';
import { admin, db } from 'lib/firebaseAdmin'


export default async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized, missing token' })
    }

    const idToken = authHeader.split('Bearer ')[1]
    const decodedToken =  await admin.auth().verifyIdToken(idToken)
    const userId = decodedToken.uid
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userData = userDoc.data()
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error verifying token or fetching user data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
