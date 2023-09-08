import CoverImage from 'components/CoverImage'
import type { Perfume } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PerfumePreview({
                                         title,
                                         coverImage,
                                         date,
                                         excerpt,
                                         author,
                                         perfume_id,
                                         price
                                       }: Omit<Perfume, '_id'>) {
  return (
    <div>
      <div className='mb-5'>
        <CoverImage
          path='perfume'
          slug={perfume_id}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className='mb-3 text-3xl leading-snug'>
        <Link href={`/perfume/${perfume_id}`} className='hover:underline'>
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
