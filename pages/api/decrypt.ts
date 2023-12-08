import admin from 'firebase-admin'
import crypto from 'crypto'
import { id } from 'date-fns/locale'

const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

export default async (req, res) => {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const encryptedOrders = req.body
    console.log('encryptedOrders: ', encryptedOrders)

    try {
      const decodedToken = await admin.auth().verifyIdToken(token)

      if (
        decodedToken.uid === process.env.ADMIN_UID ||
        decodedToken.uid === process.env.ADMIN_UID_2
      ) {
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

        try {
          const decryptedOrders = encryptedOrders.orders.map((order) => {
            return {
              email: decrypt(
                order.email.data,
                order.email.iv,
                order.email.authTag,
                keyBuffer,
              ),
              name: decrypt(
                order.name.data,
                order.name.iv,
                order.name.authTag,
                keyBuffer,
              ),
              surname: decrypt(
                order.surname.data,
                order.surname.iv,
                order.surname.authTag,
                keyBuffer,
              ),
              phone: decrypt(
                order.phone.data,
                order.phone.iv,
                order.phone.authTag,
                keyBuffer,
              ),
              address: decrypt(
                order.address.data,
                order.address.iv,
                order.address.authTag,
                keyBuffer,
              ),
              cart: decrypt(
                order.cart.data,
                order.cart.iv,
                order.cart.authTag,
                keyBuffer,
                ),
              dateAdded: order.dateAdded,
              id: order.id,
            }
          })
          res.status(200).json(decryptedOrders)
        } catch (error) {
          console.log(error)
          res.status(400).json({ error: 'Bad request' })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(401).send('Unauthorized')
    }
  }
}
