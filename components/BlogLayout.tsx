import AlertBanner from 'components/AlertBanner'
import NavBar from 'components/NavBar'
export default function BlogLayout({
  preview,    
  loading,
  children,
}: {    
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
      <NavBar />
        <main>{children}</main>
      </div>
    </>
  )
}
