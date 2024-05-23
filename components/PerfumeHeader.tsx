import type { Product } from 'lib/sanity.queries'
import styles from './PerfumeHeader.module.scss'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Loading from './Loading/Loading'
import Spline from '@splinetool/react-spline'
import {  useState, useEffect  } from 'react'
import { getSplineDataByProductId } from 'lib/firebase'

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
      <div style={spline ? { height: '825px' } : {height: 'auto'}} className={`${styles.imageContainer}`}>

        {loading && <Loading />}

        {!loading && !spline && (
          <Image
            src={urlForImage(coverImage[0]).height(1000).width(2000).url()}
            width={1000}
            height={1000}
            alt="product image"
          />
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
