import '@/styles/globals.css'
import Head from "next/head"
import type { AppProps } from 'next/app'
import {RecoilRoot} from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <RecoilRoot>
    <Head>
      <title>LeetClone</title>
      <link rel='icon' href='/favicon.png'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <meta name='description' content='web application that contains leetcod problem and  video solution'/>
    </Head>
    <Component {...pageProps} />
  </RecoilRoot> )
}
