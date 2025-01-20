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
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductPreview from 'components/ProductPreview'
import dynamic from 'next/dynamic'
import CookieConsent from 'react-cookie-consent'
import GoogleAuthButton from 'components/GoogleAuthButton'
import SignOutButton from 'components/GoogleSignOutBtn'
import { auth } from 'lib/firebase'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CircleSharpIcon from '@mui/icons-material/CircleSharp'
import ListItemIcon from '@mui/material/ListItemIcon'
import Link from '@mui/material/Link';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import sale_lottie from '../public/sale_lottie.json'
import buy_lottie from '../public/buy_lottie.json'

import Heading from 'components/Heading'
// import Link from 'next/link'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  perfume: Product[]
  cosmetics: Product[]
  elderly: Product[]
  vitamin: Product[]
  children: Product[]
  onSale: Product[]
  bestsellers: Product[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const {
    preview,
    loading,
    perfume,
    cosmetics,
    elderly,
    vitamin,
    children,
    onSale,
    bestsellers,
    settings,
  } = props

  const [heroPost, ...morePosts] = perfume || []
  const { title = demo.title, description = demo.description } = settings || {}

  const [fullHeight, setFullHeight] = useState(0)

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
  }

  useEffect(() => {
    setFullHeight(document.documentElement.scrollHeight)
  }, [])

  const middleImageStyles: React.CSSProperties = {
    top: fullHeight / 2,
  }

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <Heading text={'Thach Thao German Store'} />
          <Avatar
            sx={{ width: 260, height: 260, margin: 'auto', marginTop: '-50px' }}
            alt="Thao Ellen"
            src="/photo2.png"
          />
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                textAlign: 'center',
                marginTop: '17px',
              }}
            >
             Store Owner: Nguyễn Thị Thạch Thảo
            </Typography>
            <List sx={{ width: '100%' }}>
              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>
                Sinh sống tại Berlin, CHLB Đức.
              </ListItem>

              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>
                Điều dưỡng Hồi Sức Tích Cực tại Berlin, Đức.
              </ListItem>

              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>

                Sinh viên Điều dưỡng chuyên khoa I Hệ Đại Học.
              </ListItem>

              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>
                Điều dưỡng hướng dẫn thực hành tại viện.
              </ListItem>

              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>
                11 năm kinh nghiệm học và làm điều dưỡng tại 3 nước Việt Nam, Thuỵ Điển và Đức.
              </ListItem>

              <ListItem alignItems="center" sx={{justifyContent: 'center'}}>
                5 năm kinh nghiệm kinh doanh thực phẩm chức năng nội địa Đức.
              </ListItem>
              <Typography variant="subtitle1" gutterBottom sx={{margin:'auto', textAlign:'center', marginTop:'7px'}}>
              Thông tin thêm về Thạch thảo xem <Link href={'/'} underline="always" sx={{color: 'inherit'}}>tại đây</Link>
              </Typography>
            </List>
          </Box>
          <div className={styles.custom_slider}>
            {/* <h1 className={styles.sales_heading}>Sale!</h1> */}
            {/* <img className={styles.sales_title} src="/sale_title.png" alt="" /> */}
            <Lottie animationData={sale_lottie} loop={true} />
            <Slider {...sliderSettings}>
              {onSale.map((product) => (
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
                    sale={product.sale}
                    salePrice={product.salePrice}
                    path={'sale'}
                  />
                </div>
              ))}
            </Slider>
          </div>
          {bestsellers.length > 0 && (
            <MoreProduct
              products={bestsellers}
              title="Bestsellers"
              path="bestseller"
            />
          )}
          {vitamin.length > 0 && (
            <MoreProduct
              products={vitamin}
              title="Vitamin & More"
              path="vitamin"
            />
          )}
          {elderly.length > 0 && (
            <MoreProduct products={elderly} title="Phụ nữ" path="elderly" />
          )}
          {children.length > 0 && (
            <MoreProduct products={children} title="Trẻ em" path="children" />
          )}
          {cosmetics.length > 0 && (
            <MoreProduct
              products={cosmetics}
              title="Nước hoa & Mỹ phẩm"
              path="cosmetics"
            />
          )}
          {perfume.length > 0 && (
            <MoreProduct products={perfume} title="Nước hoa" path="perfume" />
          )}
          <div style={middleImageStyles} className={styles.middleImage}>
            <Image
              src="/d-flower-left.png"
              alt="Flower image background"
              width={1000}
              height={1000}
            />
          </div>
          <CookieConsent
            buttonText="Tôi hiểu"
            style={{ background: '#6a66df' }}
          >
            Trang web này sử dụng cookie để nâng cao trải nghiệm của người dùng.
          </CookieConsent>
        </Container>
      </Layout>
    </>
  )
}
