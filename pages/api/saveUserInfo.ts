import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { db } from 'lib/firebaseAdmin';
import {encrypt} from 'lib/encryption'

const secretKey = process.env.ENCRYPTION_KEY

if (!secretKey) {
  throw new Error('Missing ENCRYPTION_KEY in environment variables');
}

// Validate allowed fields
const ALLOWED_FIELDS = ['address', 'phone', 'email'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized, missing token' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const body =JSON.parse(req.body)
    const {field, value} = body

    // Validate payload
    if (!field || !value || typeof value !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    if (!ALLOWED_FIELDS.includes(field)) {
      return res.status(400).json({ error: 'Field not allowed for update' });
    }

    const keyBuffer = Buffer.from(secretKey, 'hex')
    // Encrypt the value
    const encryptedValue = encrypt(value, keyBuffer);

    // Update the database
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      [field]: encryptedValue,
    });

    return res.status(200).json({
      message: 'Field updated successfully',
      field,
    });
  } catch (error) {
    console.error('Error updating user field:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
