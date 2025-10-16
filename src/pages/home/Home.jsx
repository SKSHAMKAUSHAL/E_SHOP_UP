import { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Track from '../../components/track/Track';
import Testimonial from '../../components/testimonial/Testimonial';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTruck, FaHeadset, FaCreditCard } from 'react-icons/fa';


function Home() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      
      {/* Enhanced See More Button */}
      <div className="flex justify-center -mt-10 mb-16 animate-fade-in">
        <Link to={'/allproducts'}>
          <button className="group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
            }}>
            <span>View All Products</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </Link>
      </div>

      {/* Trust Badges Section */}
      <div className="py-12" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '#f9fafb' }}>
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white' }}>
              <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-3" />
              <p className="font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                100% Secure
              </p>
              <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                Payment Protected
              </p>
            </div>
            <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white' }}>
              <FaTruck className="text-4xl text-blue-600 mx-auto mb-3" />
              <p className="font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                Free Shipping
              </p>
              <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                On All Orders
              </p>
            </div>
            <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white' }}>
              <FaHeadset className="text-4xl text-purple-600 mx-auto mb-3" />
              <p className="font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                24/7 Support
              </p>
              <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                Always Available
              </p>
            </div>
            <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white' }}>
              <FaCreditCard className="text-4xl text-pink-600 mx-auto mb-3" />
              <p className="font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                Easy Returns
              </p>
              <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                30-Day Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      <Track />
      <Testimonial />

      {/* Newsletter Section */}
      <div className="py-16" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : 'white' }}>
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl"
            style={{
              background: mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
            }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: mode === 'dark' ? 'white' : 'white' }}>
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg"
                style={{ color: mode === 'dark' ? '#d1d5db' : 'rgba(255,255,255,0.9)' }}>
                Get exclusive deals, new arrivals, and special offers directly in your inbox!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-2 font-medium focus:outline-none focus:border-pink-500 transition-all duration-300"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                  color: mode === 'dark' ? 'white' : '#1f2937',
                  borderColor: mode === 'dark' ? 'rgb(75 85 99)' : 'transparent'
                }}
              />
              <button
                className="px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: mode === 'dark' ? '#ec4899' : 'white',
                  color: mode === 'dark' ? 'white' : '#ec4899'
                }}>
                Subscribe Now
              </button>
            </div>
            <p className="text-center mt-4 text-sm"
              style={{ color: mode === 'dark' ? '#9ca3af' : 'rgba(255,255,255,0.8)' }}>
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;