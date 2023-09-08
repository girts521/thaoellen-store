import PerfumePreview from 'components/PerfumePreview'
import type { Perfume } from 'lib/sanity.queries'

export default function MorePerfume({ perfume }: { perfume: Perfume[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Products
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {perfume.map((perfume) => (
          <PerfumePreview
            key={perfume._id}
            title={perfume.title}
            coverImage={perfume.coverImage}
            date={perfume.date}
            author={perfume.author}
            perfume_id={perfume.perfume_id}
            excerpt={perfume.excerpt}
            price={perfume.price}
          />
        ))}
      </div>
    </section>
  )
}
