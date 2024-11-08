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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPreview from 'components/ProductPreview'




import Heading from 'components/Heading'
import { set } from 'date-fns'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Product[]
  cosmetics: Product[]
  elderly: Product[]
  vitamin: Product[]
  children: Product[]
  onSale: Product[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, perfume, cosmetics, elderly, vitamin, children, onSale, settings } = props

 
  const [heroPost, ...morePosts] = perfume || []
  const { title = demo.title, description = demo.description } = settings || {}

  const [fullHeight, setFullHeight] = useState(0);

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  // };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1280, // Tablet view
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          <Heading text={"Thach Thao German Store"} />

          <div className={styles.custom_slider}>
          <h1 className={styles.sales_heading}>Sale!</h1>
          <Slider {...sliderSettings}>
          {elderly.map((product) => (
            <div className={styles.cardContainer}>
              <ProductPreview
                key={product._id}
                title={product.title}
                coverImage={product.coverImage}
                date={product.date}
                author={product.author}
                product_id={product.product_id}
                excerpt={product.excerpt}
                price={product.price}
                path={'sale'}
              />
            </div>
        ))}
        </Slider>
          </div>
          {onSale.length > 0 && <MoreProduct  products={onSale} title='Sale' path='sale' />}
          {vitamin.length > 0 && <MoreProduct  products={vitamin} title='Vitamin & More' path='vitamin' />}
          {elderly.length > 0 && <MoreProduct  products={elderly} title='Phụ nữ' path='elderly' />}
          {children.length > 0 && <MoreProduct  products={children} title='Trẻ em' path='children' />}
          {cosmetics.length > 0 && <MoreProduct  products={cosmetics} title='Nước hoa & Mỹ phẩm' path='cosmetics' />}
          {perfume.length > 0 && <MoreProduct products={perfume} title='Nước hoa' path='perfume' />}
          <div style={middleImageStyles} className={styles.middleImage}>
          <Image  src="/d-flower-left.png" alt='Flower image background' width={1000} height={1000} />
          </div>

        </Container>
      </Layout>
    </>
  )
}
