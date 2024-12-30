import Head from 'next/head';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Name Ma Pet` : 'MyApp'}</title>
      </Head>
      <div>{children}</div>
    </>
  );
};

export default Layout;
