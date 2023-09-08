import { groq } from 'next-sanity'

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

const perfumeFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "perfume_id": perfume_id.current,
  "author": author->{name, picture},
  price,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const perfumeIndexQuery = groq`
*[_type == "perfume"] | order(date desc, _updatedAt desc) {
  ${perfumeFields}
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

export const perfumeAndMorePerfumeQuery = groq`
{
  "post": *[_type == "perfume" && perfume_id.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${perfumeFields}
  },
  "morePosts": *[_type == "perfume" && perfume_id.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${perfumeFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const perfumeSlugsQuery = groq`
*[_type == "perfume" && defined(perfume_id.current)][].perfume_id.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

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

export interface Perfume {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  perfume_id?: string
  content?: any
  price?: number
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
