// import components
import Pets from '../components/Pets';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Adoption from '../components/Adoption';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout title="Home">
    <div className='max-w-[1440px] mx-auto overflow-hidden'>
      <Hero />
      <Pets />
      <Services />
      <Adoption />
      <Newsletter />
      <Footer />
    </div>
    </Layout>
  );
};

export default Home;
