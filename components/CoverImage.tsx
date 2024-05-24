import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import styles from './CoverImage.module.scss'

interface CoverImageProps {
  title: string
  slug?: string
  path?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, path = 'posts' } = props
  const image = source?.asset?._ref ? (
    <div
    style={{ backgroundImage:`url(${urlForImage(source).auto("format").url()})` }}
    // style={{ backgroundImage: `url(/gucci.png)` }}
    //   className={cn('shadow-small', {
    //     'transition-shadow duration-200 hover:shadow-medium': slug,
    //   })}
    >
      {/* <Image
        className="h-auto w-full"
        width={2000}
        height={1000}
        alt={`Cover Image for ${title}`}
        // src={urlForImage(source).height(1000).width(2000).url()}
        src={'/gucci.png'}
        sizes="100vw"
        priority={priority}
      /> */}
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className={styles.imageContainer}>
      {slug ? (
        <Link href={`/${path}/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
