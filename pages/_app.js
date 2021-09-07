import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Head from 'next/head'
import { useEffect, useState } from "react"
import { auth } from '../firebase'


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [align, setAlign] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
    });

  }, [])

const alignType = (type)=>{
  console.log(type);  
  setAlign(type)
}

  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/lumen/bootstrap.min.css" integrity="undefined" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@300&family=Kirang+Haerang&display=swap" rel="stylesheet"></link>

        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
      </Head>
      <NavBar user={user} alignType={alignType} />
      <Component {...pageProps} user={user} align={align} />
    </>
  )
}

export default MyApp
