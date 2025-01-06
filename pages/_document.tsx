import { Head, Html, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/next';



export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  )
}
