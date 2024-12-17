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
  sale,
  salePrice,
  path,
}: Omit<Product, '_id'>) {
  const router = useRouter();


  const redirect = () => {
    router.push(`/${path}/${product_id}`);

  }
  return (
    <div onClick={redirect} className={styles.container}>
      {sale && <img className={styles.saleIcon} src='/sale.svg'></img>}
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
      <div  className={`${styles.price} ${sale ? styles.oldSalesPrice : ''}`}>Giá: {`${price}`} 000 VND</div>
      {sale && salePrice && <div  className={`${styles.price} ${sale ? styles.salesPrice : ''}`}>Giá: {`${salePrice}`} 000 VND</div>}
    </div>
  )
}
