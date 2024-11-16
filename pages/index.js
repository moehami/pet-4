// import components
import Pets from '../components/Pets';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Adoption from '../components/Adoption';
import PetName from '../components/PetNameGenerator';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='max-w-[1440px] mx-auto overflow-hidden'>
      <Hero />
      <Pets />
      <Services />
      <Adoption />

       <div className="container mx-auto px-4 py-8">
      <PetName />
    </div>

 <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
