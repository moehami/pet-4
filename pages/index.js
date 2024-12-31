// import components
import Pets from '../components/Pets';
import Hero from '../components/Hero';
import PetNameGenerator from '../components/PetNameGen';



import Services from '../components/Services';
import Adoption from '../components/Adoption';
import PetName from '../components/PetNameGenerator2';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Home = () => {
  const handleNameGenerated = ({ names, gender, petType }) => {
    console.log(`Generated ${names.length} ${gender} names for ${petType}`);
  };
  return (
    <Layout title="Home Page">
    <div className='max-w-[1440px] mx-auto overflow-hidden'>
      <Hero />
      <div className="md:w-5/6  mx-auto ">
        <PetNameGenerator
          onNameGenerated={handleNameGenerated}
          className="w-full"
        />
      </div>
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
