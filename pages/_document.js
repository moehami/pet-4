import { Html, Head, Main, NextScript } from 'next/document';

export const metadata = {
 title: 'Tiger Names',
 keywords: "tiger names, genrate pet name",
};

export default function Document() {
  return (
   <Html lang="EN">
      <Head>

        <meta name='description' content='Tiger Names Pets 1st ' />
   <meta name="google-site-verification" content="Vy39PhyD2nktBGFbDwvkI2w0LdomDo4i-BeM5GX1vmU" />
        <link rel='icon' href='/favicon.ico' />
        {/* google font */}
        <link
          href='https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
     </Html>

  );
}