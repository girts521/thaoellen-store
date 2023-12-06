import { db } from 'lib/firebaseAdmin'
import admin from 'firebase-admin'
import crypto from 'crypto'

const secretKey = process.env.ENCRYPTION_KEY

function encrypt(text, key) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag,
  }
}

function decrypt(encryptedData, iv, authTag, keyBuffer) {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    keyBuffer,
    Buffer.from(iv, 'hex'),
  )
  decipher.setAuthTag(Buffer.from(authTag, 'hex'))
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = JSON.parse(req.body)
      const { email, name, surname, phone, address, cart } = data

      const keyBuffer = Buffer.from(secretKey, 'hex')

      const encryptedEmail = encrypt(email, keyBuffer)
      const encryptedName = encrypt(name, keyBuffer)
      const encryptedSurname = encrypt(surname, keyBuffer)
      const encryptedPhone = encrypt(phone, keyBuffer)
      const encryptedAddress = encrypt(address, keyBuffer)
      const encryptedCart = encrypt(JSON.stringify(cart), keyBuffer)

      const orderCollection = db.collection('orders')

      const newUserDoc = await orderCollection.add({
        email: {
          data: encryptedEmail.encryptedData,
          iv: encryptedEmail.iv,
          authTag: encryptedEmail.authTag,
        },
        name: {
          data: encryptedName.encryptedData,
          iv: encryptedName.iv,
          authTag: encryptedName.authTag,
        },
        surname: {
          data: encryptedSurname.encryptedData,
          iv: encryptedSurname.iv,
          authTag: encryptedSurname.authTag,
        },
        phone: {
          data: encryptedPhone.encryptedData,
          iv: encryptedPhone.iv,
          authTag: encryptedPhone.authTag,
        },
        address: {
          data: encryptedAddress.encryptedData,
          iv: encryptedAddress.iv,
          authTag: encryptedAddress.authTag,
        },
        cart: {
          data: encryptedCart.encryptedData,
          iv: encryptedCart.iv,
          authTag: encryptedCart.authTag,
        },
        dateAdded: admin.firestore.FieldValue.serverTimestamp(),
      })

      res.status(200).json({ id: newUserDoc.id })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}
