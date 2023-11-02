import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import MorePerfume from 'components/MorePerfume'
import IntroTemplate from 'intro-template'
import * as demo from 'lib/demo.data'
import type { Perfume, Settings } from 'lib/sanity.queries'

import Heading from 'components/Heading'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Perfume[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, perfume, settings } = props
  const [heroPost, ...morePosts] = perfume || []
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          {/* <BlogHeader title={title} description={description} level={1} /> */}
          <Heading text={"Thao Ellen Store"} />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.perfume_id}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {morePosts.length > 0 && <MorePerfume perfume={morePosts} />}
        </Container>
        {/*<IntroTemplate />*/}
      </Layout>
    </>
  )
}
