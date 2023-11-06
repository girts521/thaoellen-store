import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  perfumeIndexQuery,
  type Post,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const { cosmetics, elderly, vitamin } = props
  const [posts, loadingPosts] = useLiveQuery<Post[]>(
    props.perfume,
    perfumeIndexQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <IndexPage
      cosmetics={cosmetics}
      elderly={elderly}
      vitamin={vitamin}
      preview
      loading={loadingPosts || loadingSettings}
      perfume={posts || []}
      settings={settings || {}}
    />
  )
}
