import CoverImage from 'components/CoverImage'
import type { Product } from 'lib/sanity.queries'
import Link from 'next/link'
import styles from './ProductPreview.module.scss'
import { useRouter } from 'next/router';


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
  const router = useRouter();


  const redirect = () => {
    router.push(`/${path}/${product_id}`);

  }

  return (
    <div onClick={redirect} className={styles.container}>
      <div className={styles.imageContainer} >
        <CoverImage
          path={path}
          slug={product_id}
          title={title}
          image={coverImage && coverImage[0]}
          priority={false}
        />
      </div>
      <h3 className={styles.productName}>
      {title}
      </h3>
      {excerpt && <p className={styles.excerpt} >{excerpt}</p>}
      <div className={styles.price}>Giá: {`${price}`} VND</div>
    </div>
  )
}
