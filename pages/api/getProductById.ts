import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { groq } from 'next-sanity'


const productByIdQuery = groq`
*[product_id.current == $id] {
  title,
  coverImage,
  excerpt,
  product_id,
  price,
}
`;

export default async function getProductById(req, res) {
    //check if method is get
    if (req.method === 'GET') {
        //get the id from the query
        const { id } = req.query
        //check if id exists
        if (!id) {
            return res.status(400).json({ message: 'Missing id' })
        }
        //get the token and client
        const client = getClient({ token: readToken })
        //get the product by id
        const product = await client.fetch(productByIdQuery, { id })
        console.log("product after query: ",product)
        //return the product
        return res.status(200).json(product)
    }
}

