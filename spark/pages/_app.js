
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseClient';
import '../styles/global.css'
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
    });
    return () => unsub();
  }, []);

  return (<>
      <Head>
        <link rel="icon" href="/icon.png" type="image/x-icon"  />
        <title>Lumen</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
