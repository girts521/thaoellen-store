import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MorePerfume from 'components/MorePerfume'
import PerfumeHeader from 'components/PerfumeHeader'
import PerfumeBody from 'components/PerfumeBody'
import PostPageHead from 'components/PostPageHead'
import PostTitle from 'components/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { Perfume } from 'lib/sanity.queries'
import styles from './PerfumePage.module.scss'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Perfume
  morePerfume: Perfume[]
  settings: Settings
}

const NO_POSTS: Perfume[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePerfume = NO_POSTS, perfume, settings } = props
  const { title = demo.title } = settings || {}

  const slug = perfume?.perfume_id
  console.log(perfume)

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={perfume} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} level={2} />
          {preview && !perfume ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className={styles.perfumeArticle}>
                <PerfumeHeader
                  title={perfume.title}
                  coverImage={perfume.coverImage}
                  date={perfume.date}
                  author={perfume.author}
                />
                <PerfumeBody content={perfume.content} price={perfume.price}/>
                {/*<div>*/}
                {/*  Price: {`${perfume.price}`}*/}
                {/*</div>*/}
              </article>
              <SectionSeparator />
              {morePerfume?.length > 0 && <MorePerfume perfume={morePerfume} />}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
