import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import MoreProduct from 'components/MoreProduct'
import IntroTemplate from 'intro-template'
import * as demo from 'lib/demo.data'
import type { Product, Settings } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './IndexPage.module.scss'



import Heading from 'components/Heading'
import { set } from 'date-fns'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Product[]
  cosmetics: Product[]
  elderly: Product[]
  vitamin: Product[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, perfume, cosmetics, elderly, vitamin, settings } = props

 
  const [heroPost, ...morePosts] = perfume || []
  const { title = demo.title, description = demo.description } = settings || {}

  const [fullHeight, setFullHeight] = useState(0);



  useEffect(() => {
    setFullHeight(document.documentElement.scrollHeight);

  
  }, []);

  const middleImageStyles: React.CSSProperties = {
    top: (fullHeight) / 2,
  };

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <Heading text={"Thao Ellen Store"} />

          {perfume.length > 0 && <MoreProduct products={perfume} title='Nước hoa' path='perfume' />}
          {cosmetics.length > 0 && <MoreProduct  products={cosmetics} title='Mỹ phẩm' path='cosmetics' />}
          {elderly.length > 0 && <MoreProduct  products={elderly} title='Hơi già' path='elderly' />}
          {vitamin.length > 0 && <MoreProduct  products={vitamin} title='Vitamin' path='vitamin' />}

          <div style={middleImageStyles} className={styles.middleImage}>
          <Image  src="/d-flower-left.png" alt='Flower image background' width={1000} height={1000} />
          </div>

        </Container>
      </Layout>
    </>
  )
}
