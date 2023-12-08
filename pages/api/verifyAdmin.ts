import {admin} from 'lib/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.authorization

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    if (decodedToken.uid === process.env.ADMIN_UID || decodedToken.uid === process.env.ADMIN_UID_2) {
      const expiresIn = 60 * 60 * 1 * 1000; // 3 hours in milliseconds
      const expirationDate = new Date(Date.now() + expiresIn).toUTCString();
      res.setHeader(
        'Set-Cookie',
        `authToken=${token}; HttpOnly; Secure; SameSite=None; Path=/; Expires=${expirationDate}`,
      )

      res.status(200).send('Admin verified')
    } else {
      res.status(401).send('Unauthorized')
    }
  } catch (error) {
    console.log("error: ", error, "token: ", token)
    res.status(402).send('Error')
  }
}
