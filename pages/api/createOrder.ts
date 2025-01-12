import { db } from 'lib/firebaseAdmin'
import admin from 'firebase-admin'
import crypto from 'crypto'
import { customAlphabet } from 'nanoid'
import SendEmail from "../../components/SendEmail/SendEmail"
import { Resend } from 'resend';
import {encrypt} from 'lib/encryption'


const secretKey = process.env.ENCRYPTION_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = JSON.parse(req.body)
      const { email, name, phone, address, cart } = data
      const nanoid = customAlphabet('1234567890abcdef', 10)
      const uuid = nanoid(5)
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

      const keyBuffer = Buffer.from(secretKey, 'hex')

      const encryptedEmail = encrypt(email, keyBuffer)
      const encryptedName = encrypt(name, keyBuffer)
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
        order_id: uuid + "-" + timestamp
      })

      if (newUserDoc)
      {
        await resend.emails.send({
          from: 'Girts <girts@email.thaoellen.com>',
          to: [`${email}`],
          subject: 'Cảm ơn bạn đã đặt hàng!',
          react: SendEmail({orderId: `${uuid + "-" + timestamp}` }),
        });
        res.status(200).json({ id: uuid + "-" + timestamp })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}
