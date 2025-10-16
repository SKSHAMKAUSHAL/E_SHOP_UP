import { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { FaShoppingBag, FaTruck, FaShieldAlt, FaArrowRight, FaStar } from 'react-icons/fa';

function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to SHOP UP",
      subtitle: "Your Trusted Shopping Destination",
      description: "Discover premium quality products at unbeatable prices",
      image: "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
      cta: "Shop Now"
    },
    {
      title: "Premium Quality Products",
      subtitle: "100% Authentic & Verified",
      description: "All products are quality checked and verified before delivery",
      image: "https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg",
      cta: "Explore"
    },
    {
      title: "Fast & Free Delivery",
      subtitle: "Delivered to Your Doorstep",
      description: "Free shipping on all orders with secure packaging",
      image: "https://img.freepik.com/free-vector/delivery-concept-illustration_114360-392.jpg",
      cta: "Order Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden" 
      style={{ 
        backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '#f9fafb',
        minHeight: '600px'
      }}
    >
      {/* Hero Slider */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2"
                style={{ 
                  backgroundColor: mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '',
                  color: mode === 'dark' ? '#4ade80' : ''
                }}>
                <FaShieldAlt /> Secure Shopping
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2"
                style={{ 
                  backgroundColor: mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '',
                  color: mode === 'dark' ? '#60a5fa' : ''
                }}>
                <FaTruck /> Free Delivery
              </span>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2"
                style={{ 
                  backgroundColor: mode === 'dark' ? 'rgba(234, 179, 8, 0.2)' : '',
                  color: mode === 'dark' ? '#fbbf24' : ''
                }}>
                <FaStar /> Top Rated
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ 
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              {slides[currentSlide].title}
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold"
              style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
              {slides[currentSlide].subtitle}
            </h2>

            <p className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
              style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => window.location.href = '/allproducts'}
                className="group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                }}>
                <FaShoppingBag />
                {slides[currentSlide].cta}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 hover:shadow-xl"
                style={{
                  borderColor: mode === 'dark' ? '#ec4899' : '#ec4899',
                  color: mode === 'dark' ? 'white' : '#ec4899',
                  backgroundColor: mode === 'dark' ? 'transparent' : 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ec4899';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = mode === 'dark' ? 'transparent' : 'white';
                  e.target.style.color = mode === 'dark' ? 'white' : '#ec4899';
                }}>
                Create Account
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div>
                <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                  10K+
                </p>
                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                  500+
                </p>
                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Products
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                  4.9★
                </p>
                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Ratings
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative animate-fade-in">
            <div className="relative">
              <img 
                src={slides[currentSlide].image} 
                alt="Shopping" 
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 animate-bounce-subtle"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl">
                    <FaStar className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                      4.9/5
                    </p>
                    <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      Customer Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-12 bg-pink-600' : 'w-3 bg-gray-300'
              }`}
              style={{
                backgroundColor: currentSlide === index 
                  ? '#ec4899' 
                  : (mode === 'dark' ? 'rgb(75 85 99)' : '#d1d5db')
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20 -z-10"></div>
    </div>
  );
}

export default HeroSection;