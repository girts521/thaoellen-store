import { id } from 'date-fns/locale'
import {decrypt} from 'lib/encryption'
import { admin, db } from 'lib/firebaseAdmin'

const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

export default async (req, res) => {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const encryptedOrders = req.body

    try {
      const decodedToken = await admin.auth().verifyIdToken(token)

      const userDocRef = db.collection('users').doc(decodedToken.uid);
      const userDoc = await userDocRef.get();
  
      if (!userDoc) {
        return res.status(404).json({ error: 'User not found' })
      }
      const userData = userDoc.data()
      if (userData.isAdmin) {

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
              surname: order.surname ? decrypt(
                order.surname.data,
                order.surname.iv,
                order.surname.authTag,
                keyBuffer,
              ) : '',
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
      console.log("The error here:")
      console.log(error)
      res.status(401).send('Unauthorized')
    }
  }
}
