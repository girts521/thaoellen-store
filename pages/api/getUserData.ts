
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase-admin/auth';
import { admin, db } from 'lib/firebaseAdmin'
import { decrypt } from 'lib/encryption';


const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

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
    if (userData.address && typeof userData.address != 'string')
      userData.address = decrypt(userData.address.encryptedData, userData.address.iv, userData.address.authTag, keyBuffer)
    if (userData.phone && typeof userData.phone != 'string')
      userData.phone = decrypt(userData.phone.encryptedData, userData.phone.iv, userData.phone.authTag, keyBuffer)
    if (userData.email && typeof userData.email != 'string')
      userData.email = decrypt(userData.email.encryptedData, userData.email.iv, userData.email.authTag, keyBuffer)
    if (userData.name && typeof userData.name != 'string')
      userData.name = decrypt(userData.name.encryptedData, userData.name.iv, userData.name.authTag, keyBuffer)
    if (userData.facebook && typeof userData.facebook != 'string')
      userData.facebook = decrypt(userData.facebook.encryptedData, userData.facebook.iv, userData.facebook.authTag, keyBuffer)
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error verifying token or fetching user data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
