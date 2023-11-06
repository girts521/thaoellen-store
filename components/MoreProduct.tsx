import ProductPreview from 'components/ProductPreview'
import type { Product } from 'lib/sanity.queries'
import styles from './MoreProducts.module.scss'


export default function MoreProduct({ product, title, path }: { product: Product[], path: string, title: string }) {
  console.log("product", product)
  return (
    <section>
      <h2 className={styles.heading}>
         {title} 
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {product.map((product) => (
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
//mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl