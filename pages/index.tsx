import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPerfume,
  getClient,
  getSettings,
  getAllCosmetics,
  getAllElderly,
  getAllVitamin,
  getAllChildren,
  getAllProductsOnSale,
  getAllBestsellers
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  perfume: Post[]
  cosmetics: Post[]
  elderly: Post[]
  vitamin: Post[]
  children: Post[]
  onSale: Post[]
  bestseller: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { perfume, cosmetics, elderly, vitamin, children, onSale, bestseller, settings, draftMode } = props

  if (draftMode) {
    return (
      <PreviewIndexPage
        perfume={perfume}
        cosmetics={cosmetics}
        elderly={elderly}
        vitamin={vitamin}
        children={children}
        onSale={onSale}
        bestsellers={bestseller}
        settings={settings}
      />
    )
  }

  return (
    <IndexPage
      perfume={perfume}
      cosmetics={cosmetics}
      elderly={elderly}
      vitamin={vitamin}
      children={children}
      onSale={onSale}
      bestsellers={bestseller}
      settings={settings}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, perfume = [], cosmetics = [], elderly = [], vitamin = [], children = [], onSale = [], bestseller = []] =
    await Promise.all([
      getSettings(client),
      getAllPerfume(client),
      getAllCosmetics(client),
      getAllElderly(client),
      getAllVitamin(client),
      getAllChildren(client),
      getAllProductsOnSale(client),
      getAllBestsellers(client)
    ])

  return {
    props: {
      perfume,
      cosmetics,
      elderly,
      vitamin,
      children,
      onSale,
      bestseller,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
