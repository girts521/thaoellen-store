import ProductPreview from 'components/ProductPreview'
import type { Product } from 'lib/sanity.queries'
import styles from './MoreProducts.module.scss'


export default function MoreProduct({ products, title, path }: { products: Product[], path: string, title: string }) {
  console.log("product", products)
  return (
    <section>
      <h2 className={styles.heading}>
         {title} 
      </h2>
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
      </div>
    </section>
  )
}
