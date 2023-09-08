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

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PerfumeBody({ content, price }) {
  return (
    <div className={`${styles.perfumeBody} ${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
      <div>
        Price: {`${price}`}
      </div>
      <div className={styles.action}>
        <button className={styles.addToCart}>Add to cart</button>
        <button className={styles.contact}>Contact to buy</button>
      </div>
    </div>
  )
}
