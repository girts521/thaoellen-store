import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreProduct from 'components/MoreProduct'
import PerfumeHeader from 'components/PerfumeHeader'
import PerfumeBody from 'components/PerfumeBody'
import PostPageHead from 'components/PostPageHead'
import PostTitle from 'components/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { Product} from 'lib/sanity.queries'
import styles from './PerfumePage.module.scss'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Product
  morePerfume: Product[]
  settings: Settings
}

const NO_POSTS: Product[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePerfume = NO_POSTS, perfume, settings } = props
  const { title = demo.title } = settings || {}

  const slug = perfume?.product_id
  console.log('perfume: ', perfume)

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={perfume} />

      <Layout preview={preview} loading={loading}>
        <Container>
          {/* <BlogHeader title={title} level={2} /> */}
          {preview && !perfume ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <div className={styles.perfumeArticle}>
                <PerfumeHeader
                  title={perfume.title}
                  coverImage={perfume.coverImage}
                  date={perfume.date}
                  product_id={perfume.product_id}
                  author={perfume.author}
                />
                <PerfumeBody product_id={perfume.product_id} title={perfume.title} content={perfume.content} price={perfume.price}/>

              </div>
              {morePerfume?.length > 0 && <MoreProduct product={morePerfume} title='Nước hoa' path='perfume' />}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
