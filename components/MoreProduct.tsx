import ProductPreview from 'components/ProductPreview'
import type { Product } from 'lib/sanity.queries'
import styles from './MoreProducts.module.scss'
import { useState, useEffect, use } from 'react'
import Loading from 'components/Loading/Loading'

export default function MoreProduct({
  products,
  title,
  path,
}: {
  products: Product[]
  path: string
  title: string
}) {
  const [restProducts, setRestProducts] = useState<Product[]>([])
  const [showRestProducts, setShowRestProducts] = useState(false)
  const [loading, setLoading] = useState(false)

  const getRestProducts = async () => {
    setShowRestProducts(!showRestProducts)
    if (restProducts.length > 0) {
      return
    } else {
      try {
      const firstIds = products.map(item => item._id);
      setLoading(true)
      const res = await fetch(`/api/getRestProd?title=${path}&firstIds=${JSON.stringify(firstIds)}`);
      console.log('res', res)
      const data = await res.json()
      console.log('data', data)
      setRestProducts(data)
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
  }

  return (
    <section>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductPreview
            key={product._id}
            title={product.title}
            coverImage={product.coverImage}
            date={product.date}
            author={product.author}
            product_id={product.product_id}
            excerpt={product.excerpt}
            price={product.price}
            path={path}
          />
        ))}

        {showRestProducts && restProducts.map((product) => (
          <>
          <ProductPreview
            key={product._id}
            title={product.title}
            coverImage={product.coverImage}
            date={product.date}
            author={product.author}
            product_id={product.product_id}
            excerpt={product.excerpt}
            price={product.price}
            path={path}
          />
          </>
        ))}
        
      </div>
      <div className={styles.loadMore}>
      {loading && <Loading />}
        <button onClick={getRestProducts} className={styles.button}>
        {showRestProducts ? 'Hiển thị ít hơn'  : 'Tải thêm'}
        </button>
      </div>
    </section>
  )
}
