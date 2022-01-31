import Head from 'next/head'

function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #29333D;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function CustomApp({ Component, pageProps }) {
    return (
    <>
        <GlobalStyle />
        <Head>
          {/* <tittle>Aluracord- Hollow Knight</tittle> */}
          <link rel='icon' href='https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/602d1305678a8d5fdb372271e980da6a/32/192x192.png' />
        </Head>
        <Component {...pageProps} />
    </>)
}