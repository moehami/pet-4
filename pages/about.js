// import components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About Page">
        <Header />
      
      <div className="container max-w-[1440px]  scrollbar bg-[#EBE3CC] lg:bg-hero md:py-20 justify-start items-center min-h-[400px] lg:h-[805px]">
      <div className='overflow-y-auto md:py-20 md:p-2 md:w-7/12 md:leading-relaxed bg-[#EBE3CC] '>
      <div className=" py-12 ">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to <strong>Name Ma Pet</strong>, your ultimate destination for finding the perfect name for your furry, feathery, or scaly friend! We understand that naming your pet is a special moment—it’s the first step in building a lifelong bond with your new companion.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              At <strong>Name Ma Pet</strong>, we believe that every pet deserves a name that reflects their personality, appearance, and the love they bring into your life. Our mission is to make the naming process fun, easy, and inspiring.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-3">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Curated Name Lists</strong>: From classic to trendy, we’ve got names for every type of pet and personality.</li>
              <li><strong>Themed Suggestions</strong>: Explore names based on themes like nature, pop culture, mythology, and more.</li>
              <li><strong>Tips & Guides</strong>: Expert advice on how to choose the right name for your pet.</li>
              <li><strong>Community Stories</strong>: Share your pet’s name story and connect with other pet lovers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Why Choose Us?</h2>
            <p className="text-gray-600">
              Naming your pet is a big decision, and we’re here to make it enjoyable. Our website is designed to be user-friendly, so you can easily browse, search, and save your favorite names. Plus, our team of pet enthusiasts is constantly updating our database to bring you fresh and creative ideas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Join the Name Ma Pet Family</h2>
            <p className="text-gray-600">
              We’re more than just a pet name website—we’re a community of pet lovers who celebrate the joy and companionship that pets bring to our lives. Whether you’re a first-time pet owner or a seasoned animal lover, we’re thrilled to be part of your journey.
            </p>
            <p className="text-gray-600 mt-4">
              Thank you for choosing <strong>Name Ma Pet</strong> to help you find the perfect name for your beloved companion. Let’s make naming your pet an unforgettable experience!
            </p>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Got questions or feedback? We’d love to hear from you! Reach out to us at{" "}
              <a href="mailto:contact@namemapet.com" className="text-green-600 hover:underline">
                contact@namemapet.com
              </a>{" "}
              or connect with us on social media.
            </p>
            <p className="text-gray-600 mt-4">Happy naming! 🐾</p>
          </div>
        </div>
      </div>
    </div>
    </div></div>
    </Layout>
  );

}
