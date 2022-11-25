/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/google-font-display */

import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
React.useLayoutEffect = React.useEffect

/* const gtagId = '' //TODO : fill gtagId here

const gTagScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtagId}');`

const gTagNoScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtagId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>` */

const MyDocument = () => (
  <Html lang="en">
    <Head>
      <meta name="robots" content="noindex" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="true" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />

      {/* <script dangerouslySetInnerHTML={{ __html: gTagScript }} /> */}
    </Head>
    <body>
      {/* <noscript dangerouslySetInnerHTML={{ __html: gTagNoScript }} /> */}
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
