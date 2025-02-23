import { groq } from 'next-sanity'

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// ==================================================================
// Perfume
// ==================================================================

const perfumeFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const perfumeIndexQuery = groq`
*[_type == "perfume"] [0...8] {
  ${perfumeFields}
}`

export const getRestPerfume = groq`
*[_type == "perfume"  && !(_id in $firstIds)] {
  ${perfumeFields}
}`

export const perfumeAndMorePerfumeQuery = groq`
{
  "post": *[_type == "perfume" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${perfumeFields}
  },
  "morePosts": *[_type == "perfume" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${perfumeFields}
  }
}`

export const perfumeSlugsQuery = groq`
*[_type == "perfume" && defined(product_id.current)][].product_id.current
`
export interface Product {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
  sale?: boolean
  salePrice?: number
  path?: string
}

// ==================================================================
// On Sale
// ==================================================================
// _type in ["perfume", "otherType1", "otherType2"] &&
const onSaleFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name,
  sale
`

export const onSaleQuery = groq`
*[sale == true] {
  ${onSaleFields}
}`

export const onSaleSlugsQuery = groq`
*[_type == "sale" && defined(product_id.current)][].product_id.current
`
export const onSaleAndMoreOnSaleQuery = groq`
{
  "post": *[sale == true  && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${onSaleFields}
  },
  "morePosts": *[sale == true  && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${onSaleFields}
  }
}`

// ==================================================================
// Bestselletrs
// ==================================================================

const bestsellersFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name,
  sale
`

export const bestsellersQuery = groq`
*[bestseller == true] [0...8] {
  ${bestsellersFields}
}`

export const getRestBestseller = groq`
*[bestseller == true  && !(_id in $firstIds)] {
  ${bestsellersFields}
}`

export const bestsellersSlugsQuery = groq`
*[_type == "bestsellers" && defined(product_id.current)][].product_id.current
`

export const bestsellersAndMoreBestsellersQuery = groq`
{
  "post": *[bestseller == true  && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${bestsellersFields}
  },
  "morePosts": *[bestseller == true  && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${bestsellersFields}
  }
}`

// ==================================================================
// Cosmetics
// ==================================================================

const cosmeticsFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const cosmeticsIndexQuery = groq`
*[_type == "cosmetics"] [0...8] {
  ${cosmeticsFields}
}`

export const getRestCosmetics = groq`
*[_type == "cosmetics"  && !(_id in $firstIds)] {
  ${cosmeticsFields}
}`

export const cosmeticsAndMoreCosmeticsQuery = groq`
{
  "post": *[_type == "cosmetics" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${cosmeticsFields}
  },
  "morePosts": *[_type == "cosmetics" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${cosmeticsFields}
  }
}`

export const cosmeticsSlugsQuery = groq`
*[_type == "cosmetics" && defined(product_id.current)][].product_id.current
`
export interface Cosmetics {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
}

// ==================================================================
// Elderly
// ==================================================================

const elderlyFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const elderlyIndexQuery = groq`
*[_type == "elderly"] [0...8] {
  ${elderlyFields}
}`

export const getRestElderly = groq`
*[_type == "elderly"  && !(_id in $firstIds)] {
  ${elderlyFields}
}`

export const elderlyAndMoreElderlyQuery = groq`
{
  "post": *[_type == "elderly" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${elderlyFields}
  },
  "morePosts": *[_type == "elderly" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${elderlyFields}
  }
}`

export const elderlySlugsQuery = groq`
*[_type == "elderly" && defined(product_id.current)][].product_id.current
`
export interface Elderly {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
}

// ==================================================================
// Vitamin
// ==================================================================

const vitaminFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const vitaminIndexQuery = groq`
*[_type == "vitamin"] [0...8] {
  ${vitaminFields}
}`

export const getRestVitamin = groq`
*[_type == "vitamin"  && !(_id in $firstIds)] {
  ${vitaminFields}
}`

export const vitaminAndMoreVitaminQuery = groq`
{
  "post": *[_type == "vitamin" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${vitaminFields}
  },
  "morePosts": *[_type == "vitamin" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${vitaminFields}
  }
}`

export const vitaminSlugsQuery = groq`
*[_type == "vitamin" && defined(product_id.current)][].product_id.current
`
export interface Vitamin {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
}

// ==================================================================
// Children
// ==================================================================

const childrenFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const childrenIndexQuery = groq`
*[_type == "children"] [0...8] {
  ${childrenFields}
}`

export const getRestChildren = groq`
*[_type == "children" && !(_id in $firstIds)] {
  ${childrenFields}
}`

export const childrenAndMoreChildrenQuery = groq`
{
  "post": *[_type == "children" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${childrenFields}
  },
  "morePosts": *[_type == "children" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${childrenFields}
  }
}`

export const childrenSlugsQuery = groq`
*[_type == "children" && defined(product_id.current)][].product_id.current
`
export interface Children {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
}

// ==================================================================
// Pregnancy
// ==================================================================

const pregnancyFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "product_id": product_id.current,
  "author": author->{name, picture},
  price,
  sale,
  salePrice,
  name
`

export const pregnancyIndexQuery = groq`
*[_type == "pregnancy"] [0...8] {
  ${pregnancyFields}
}`

export const getRestPregnancy = groq`
*[_type == "pregnancy"  && !(_id in $firstIds)] {
  ${pregnancyFields}
}`

export const pregnancyAndMorePregnancyQuery = groq`
{
  "post": *[_type == "pregnancy" && product_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${pregnancyFields}
  },
  "morePosts": *[_type == "pregnancy" && product_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${pregnancyFields}
  }
}`

export const pregnancySlugsQuery = groq`
*[_type == "pregnancy" && defined(product_id.current)][].product_id.current
`
export interface Pregnancy {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  product_id?: string
  content?: any
  price?: number
}






