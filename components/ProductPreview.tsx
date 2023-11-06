import CoverImage from 'components/CoverImage'
import type { Product } from 'lib/sanity.queries'
import Link from 'next/link'
import styles from './ProductPreview.module.scss'

export default function ProductPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  product_id,
  price,
  path,
}: Omit<Product, '_id'>) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} >
        <CoverImage
          path={path}
          slug={product_id}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className={styles.productName}>
        <Link href={`/${path}/${product_id}`}>
          {title}
        </Link>
      </h3>
      {excerpt && <p className={styles.excerpt} >{excerpt}</p>}
      <div className={styles.price}>Price: {`${price}`}</div>
    </div>
  )
}
