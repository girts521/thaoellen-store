/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import styles from './PerfumeBody.module.scss'
import { SanityImage } from './SanityImage'
import Image from 'next/image'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PerfumeBody({ content, price, title }) {
  return (
    <div className={`${styles.perfumeBody} ${styles.portableText}`}>
      <h2>{title}</h2>
      <PortableText value={content} components={myPortableTextComponents} />
      <div className={styles.price}>Price: {`${price}`}</div>
      <div className={styles.action}>
        <button className={styles.addToCart}>
          {' '}
          <Image
            src={'/bag.png'}
            width={1000}
            height={1000}
            alt="product image"
          />{' '}
          Add to cart
        </button>
        <button className={styles.contact}>
          {' '}
          <Image
            src={'/contact.png'}
            width={1000}
            height={1000}
            alt="product image"
          />
          Contact to buy
        </button>
      </div>
    </div>
  )
}
