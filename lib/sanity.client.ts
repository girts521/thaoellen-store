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

export async function getRestPerfumeProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestPerfume)) || []
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
// Cosmetics
// ==================================================================
export async function getAllCosmetics(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(cosmeticsIndexQuery)) || []
}

export async function getRestCosmeticsProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestCosmetics)) || []
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

export async function getRestElderlyProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestElderly)) || []
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

export async function getRestVitaminProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestVitamin)) || []
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
  return (await client.fetch(childrenIndexQuery)) || []
}

export async function getRestChildrenProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestChildren)) || []
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

export async function getRestPregnancyProd(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(getRestPregnancy)) || []
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


