import PostPage from 'components/PostPage'
import PerfumePage from 'components/PerfumePage'
import PreviewPostPage from 'components/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
    getAllCosmeticsSlugs,
  getClient,
  getSettings,
  getCosmetics,
} from 'lib/sanity.client'
import { Product, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  post: Product
  morePosts: Product[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, draftMode } = props

  if (draftMode) {
    return (
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    )
  }

  return <PerfumePage perfume={post} morePerfume={morePosts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getCosmetics(client, params.product_id)
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      morePosts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllCosmeticsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/cosmetics/${slug}`) || [],
    fallback: 'blocking',
  }
}
