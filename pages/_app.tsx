

import { AppProps } from 'next/app'
import { lazy } from 'react'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import 'tailwindcss/tailwind.css'
import './Global.css'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: lime[500], // Use lime's 500 shade
//     },
//     secondary: {
//       main: purple[500], // Use purple's 500 shade
//     },
//   },
// });

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <>
          <CssBaseline />
        <Component {...pageProps} />
        </>
      )}
    </>
  )
}
