import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import {getRestPerfumeProd, getRestCosmeticsProd, getRestElderlyProd, getRestVitaminProd, getRestChildrenProd, getRestBestsellerProd} from 'lib/sanity.client'

export default async function getRestProd(req, res) {
  if (req.method === 'GET') {
    const title = req.query.title
    const firstIds = JSON.parse(req.query.firstIds);

    if (!title) {
      return res.status(400).json({ message: 'Missing title' })
    }

    //get the token and client
    const client = getClient({ token: readToken })

    try{
        if(title === 'perfume'){
            console.log("inside perfume")
            const perfume = await getRestPerfumeProd(client, firstIds)
            console.log("perfume: ", perfume)
            return res.status(200).json(perfume)
          }
          if(title === 'cosmetics'){
            const cosmetics = await getRestCosmeticsProd(client, firstIds)
            return res.status(200).json(cosmetics)
          }
          if(title === 'elderly'){
            const elderly = await getRestElderlyProd(client, firstIds)
            return res.status(200).json(elderly)
          }
          if(title === 'vitamin'){
            const vitamin = await getRestVitaminProd(client,firstIds)
            return res.status(200).json(vitamin)
          }
          if(title === 'children'){
            const children = await getRestChildrenProd(client, firstIds)
            return res.status(200).json(children)
          }
          if(title === 'bestseller'){
            const bestseller = await getRestBestsellerProd(client, firstIds)
            return res.status(200).json(bestseller)
          }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: `Error: ${err}`})
    }
  }
}
