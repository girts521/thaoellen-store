import { firestore } from 'firebase-admin'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  indexQuery, perfumeAndMorePerfumeQuery, perfumeSlugsQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
  perfumeIndexQuery,
  onSaleQuery,
  onSaleSlugsQuery,
  onSaleAndMoreOnSaleQuery,
  bestsellersQuery,
  getRestBestseller,
  bestsellersAndMoreBestsellersQuery,
  bestsellersSlugsQuery,
  cosmeticsIndexQuery,
  cosmeticsSlugsQuery,
  cosmeticsAndMoreCosmeticsQuery,
  elderlyIndexQuery,
  elderlySlugsQuery,
  elderlyAndMoreElderlyQuery,
  vitaminIndexQuery,
  vitaminSlugsQuery,
  vitaminAndMoreVitaminQuery,
  getRestElderly,
  getRestCosmetics,
  getRestPerfume,
  getRestVitamin,
  childrenIndexQuery,
  getRestChildren,
  childrenSlugsQuery,
  childrenAndMoreChildrenQuery,
  pregnancyIndexQuery,
  getRestPregnancy,
  pregnancySlugsQuery,
  pregnancyAndMorePregnancyQuery


} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(indexQuery)) || []
}


export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}


export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

// ==================================================================
// Perfume
// ==================================================================
export async function getAllPerfume(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(perfumeIndexQuery)) || []
}

export async function getRestPerfumeProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestPerfume, {firstIds})) || []
}

export async function getAllPerfumeSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(perfumeSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPerfume(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(perfumeAndMorePerfumeQuery, { slug })
}

// ==================================================================
// On Sale
// ==================================================================

export async function getAllProductsOnSale(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(onSaleQuery)) || []
}

export async function getAllSaleSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(onSaleSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getSale(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(onSaleAndMoreOnSaleQuery, { slug })
}

// ==================================================================
// Bestsellers
// ==================================================================

export async function getAllBestsellers(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(bestsellersQuery)) || []
}

export async function getRestBestsellerProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestBestseller, { firstIds })) || [];
}

export async function getAllBestellersSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(bestsellersSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getBestsellers(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(bestsellersAndMoreBestsellersQuery, { slug })
}
// ==================================================================
// Cosmetics
// ==================================================================
export async function getAllCosmetics(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(cosmeticsIndexQuery)) || []
}

export async function getRestCosmeticsProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestCosmetics, {firstIds})) || []
}

export async function getAllCosmeticsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(cosmeticsSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getCosmetics(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(cosmeticsAndMoreCosmeticsQuery, { slug })
}

// ==================================================================
// Elderly
// ==================================================================
export async function getAllElderly(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(elderlyIndexQuery)) || []
}

export async function getRestElderlyProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestElderly, {firstIds})) || []
}

export async function getAllElderlySlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(elderlySlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getElderly(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(elderlyAndMoreElderlyQuery, { slug })
}

// ==================================================================
// Vitamin
// ==================================================================
export async function getAllVitamin(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(vitaminIndexQuery)) || []
}

export async function getRestVitaminProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestVitamin, {firstIds})) || []
}

export async function getAllVitaminSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(vitaminSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getVitamin(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(vitaminAndMoreVitaminQuery, { slug })
}

// ==================================================================
// Children
// ==================================================================
export async function getAllChildren(client: SanityClient): Promise<Post[]> {
  const products = await client.fetch(childrenIndexQuery)
  console.log("products: ", products.length)
  return (products) || []
}

export async function getRestChildrenProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestChildren,{ firstIds })) || []
}

export async function getAllChildrenSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(childrenSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getChildren(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(childrenAndMoreChildrenQuery, { slug })
}


// ==================================================================
// Pregnancy
// ==================================================================
export async function getAllPregnancy(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(pregnancyIndexQuery)) || []
}

export async function getRestPregnancyProd(client: SanityClient, firstIds: string[]): Promise<Post[]> {
  return (await client.fetch(getRestPregnancy, {firstIds})) || []
}

export async function getAllPregnancySlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(pregnancySlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPregnancy(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(pregnancyAndMorePregnancyQuery, { slug })
}


