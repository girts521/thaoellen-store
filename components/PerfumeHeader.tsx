import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Perfume } from 'lib/sanity.queries'
import perfume from '../schemas/perfume'
import styles from './PerfumeHeader.module.scss'

export default function PerfumeHeader(
  props: Pick<Perfume, 'title' | 'coverImage' | 'date' | 'author' | 'perfume_id'>,
) {
  const { title, coverImage, date, author, perfume_id } = props
  return (
    <>
      {/*<PostTitle>{title}</PostTitle>*/}
      <div className={`mb-8 sm:mx-0 md:mb-16 ${styles.imageContainer}`}>
        <CoverImage title={title} image={coverImage} priority slug={perfume_id} />
      </div>
    </>
  )
}
