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

import { Suspense, lazy, useState, useEffect } from 'react'

export default function PerfumeHeader(
  props: Pick<
    Product,
    'title' | 'coverImage' | 'date' | 'author' | 'product_id'
  >,
) {
  const { title, coverImage, date, author, product_id } = props

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
