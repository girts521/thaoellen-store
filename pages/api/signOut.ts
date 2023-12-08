
export default async (req, res) => {
  
    try {
        // Sign-out successful.
        res.setHeader('Set-Cookie', `authToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        res.status(200).send('Sign out successful')
    
    } catch (error) {
      console.log(error)
      res.status(402).send('Error')
    }
  }