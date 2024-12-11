import '../styles/globals.css'
import Head from "next/head";
import { Provider } from 'react-redux';
import { store } from '../store/store';


export default function App({ Component, pageProps }) {

  return (
    <>
     <Provider store={store}>
      <Head>
        <title>Vaidhanik Firewall</title>
      </Head>
      <Component {...pageProps} />
      </Provider>
    </>
  )
}