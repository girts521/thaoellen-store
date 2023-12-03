import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Product } from 'lib/sanity.queries'
import perfume from '../schemas/perfume'
import styles from './PerfumeHeader.module.scss'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Loading from './Loading/Loading'
import Spline from '@splinetool/react-spline'
import { Suspense, lazy, useState, useEffect, use } from 'react'
import {getSplineDataByProductId} from 'lib/firebase'

export default function PerfumeHeader(
  props: Pick<
    Product,
    'title' | 'coverImage' | 'date' | 'author' | 'product_id'
  >,
) {
  const { title, coverImage, date, author, product_id } = props
  useEffect(() => {
    //hit db via api call and check using product_id if there is a spline link
    //if there is spline then render it
    //if not then render the image
     const splineData = getSplineDataByProductId(product_id)

  }, [product_id])



  const [loading, setLoading] = useState(true)

  return (
    <>
      <div className={`mb-8 sm:mx-0 md:mb-16 ${styles.imageContainer}`}>
        {/* <CoverImage title={title} image={coverImage} priority slug={product_id} /> */}
        {/* <Image
          src={urlForImage(coverImage).height(1000).width(2000).url()}
          width={1000}
          height={1000}
          alt="product image"
        /> */}
        {loading && (
          <Loading />
        )}

        <Spline
          onLoad={() => {
            setLoading(false)
          }}
          scene="https://prod.spline.design/p5kU3-WL7CAvd3UA/scene.splinecode"
        />
      </div>
    </>
  )
}
