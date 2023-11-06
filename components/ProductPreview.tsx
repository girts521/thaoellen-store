import CoverImage from 'components/CoverImage'
import type { Product } from 'lib/sanity.queries'
import Link from 'next/link'

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
    <div>
      <div className='mb-5'>
        <CoverImage
          path={path}
          slug={product_id}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className='mb-3 text-3xl leading-snug'>
        <Link href={`/${path}/${product_id}`} className='hover:underline'>
          {title}
        </Link>
      </h3>
      {excerpt && <p className='mb-4 text-lg leading-relaxed'>{excerpt}</p>}
      <div>
        Price: {`${price}`}
      </div>
    </div>
  )
}
