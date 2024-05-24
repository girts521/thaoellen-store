import type { Product } from 'lib/sanity.queries'
import styles from './PerfumeHeader.module.scss'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Loading from './Loading/Loading'
import Spline from '@splinetool/react-spline'
import { useState, useEffect } from 'react'
import { getSplineDataByProductId } from 'lib/firebase'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function PerfumeHeader(
  props: Pick<
    Product,
    'title' | 'coverImage' | 'date' | 'author' | 'product_id'
  >,
) {
  const { coverImage, product_id } = props

  const [spline, setSpline] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //hit db via api call and check using product_id if there is a spline link
    //if there is spline then render it
    //if not then render the image
    const getSplineData = async () => {
      const splineData = await getSplineDataByProductId(product_id)
      if (splineData && splineData.link) {
        setSpline(splineData.link)
      } else {
        setSpline(null)
        setLoading(false)
      }
    }
    getSplineData()
  }, [product_id])

  return (
    <>
      <div
        style={spline ? { height: '825px' } : { height: 'auto', maxHeight: '500px' }}
        className={`${styles.imageContainer}`}
      >
        {loading && <Loading />}

        {/* {!loading && !spline && (
          <Image
            src={urlForImage(coverImage[0]).height(1000).width(2000).url()}
            width={1000}
            height={1000}
            alt="product image"
          />
        )} */}

        {!loading && !spline && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {coverImage &&
              coverImage.map((image) => {
                return (
                  <SwiperSlide>
                    {' '}
                    <Image
                      src={urlForImage(image)
                        .height(1000)
                        .width(2000)
                        .url()}
                      width={1000}
                      height={1000}
                      alt="product image"
                    />
                  </SwiperSlide>
                )
              })}
          </Swiper>
        )}

        {spline && (
          <Spline
            onLoad={() => {
              setLoading(false)
            }}
            scene={spline}
          />
        )}
      </div>
    </>
  )
}
