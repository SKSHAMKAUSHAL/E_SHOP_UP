import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import myContext from '../../context/data/myContext';
import { 
  FaShoppingBag, 
  FaTruck, 
  FaShieldAlt, 
  FaArrowRight, 
  FaStar, 
  FaUserCircle, 
  FaClipboardList,
  FaFire,
  FaCrown,
  FaBolt
} from 'react-icons/fa';

// Import local images from assets folder
import heroImage1 from '../../assets/rupixen-Q59HmzK38eQ-unsplash.jpg';
import heroImage2 from '../../assets/shoper-slLo94wES2M-unsplash.jpg';
import heroImage5 from '../../assets/eniko-kis-KsLPTsYaqIQ-unsplash.jpg';
import heroImage6 from '../../assets/giorgio-trovato-K62u25Jk6vo-unsplash.jpg';
import heroImage7 from '../../assets/imani-bahati-LxVxPA1LOVM-unsplash.jpg';

function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();
  
  // State Management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedText, setAnimatedText] = useState(0);
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = user && user.user && user.user.email;
  const userName = isLoggedIn ? user.user.email.split('@')[0] : '';

  // Rotating text animation phrases
  const rotatingPhrases = [
    "Premium Lifestyle Products",
    "Curated Collections",
    "Exclusive Deals Daily",
    "Free Worldwide Shipping"
  ];

  // Premium product slides
  const slides = [
    {
      title: "Discover the Future of Shopping",
      subtitle: "Premium Lifestyle & Fashion",
      description: "Curated collections of luxury products handpicked for the modern lifestyle",
      image: heroImage1,
      cta: "Shop Now",
      category: "all",
      badge: { icon: FaFire, text: "Trending", color: "orange" },
      stats: { items: "10K+", rating: "4.9★", reviews: "5K+" }
    },
    {
      title: "Luxury Redefined",
      subtitle: "100% Authentic Premium Brands",
      description: "Experience excellence with our verified collection of designer products",
      image: heroImage2,
      cta: "Explore Collection",
      category: "fashion",
      badge: { icon: FaCrown, text: "Premium", color: "purple" },
      stats: { items: "2K+", rating: "5.0★", reviews: "3K+" }
    },
    {
      title: "Smart Technology",
      subtitle: "Next-Gen Electronics",
      description: "Cutting-edge gadgets and smart devices for the tech-savvy individual",
      image: heroImage6,
      cta: "Discover Tech",
      category: "electronics",
      badge: { icon: FaBolt, text: "Innovation", color: "blue" },
      stats: { items: "5K+", rating: "4.8★", reviews: "8K+" }
    },
    {
      title: "Fashion Forward",
      subtitle: "Style Meets Elegance",
      description: "Trendsetting fashion that defines your unique personality",
      image: heroImage7,
      cta: "Shop Fashion",
      category: "fashion",
      badge: { icon: FaCrown, text: "Designer", color: "pink" },
      stats: { items: "3K+", rating: "4.9★", reviews: "4K+" }
    },
    {
      title: "Exclusive Collection",
      subtitle: "Limited Edition Arrivals",
      description: "Be the first to own our exclusive limited edition products",
      image: heroImage5,
      cta: "View Collection",
      category: "trending",
      badge: { icon: FaFire, text: "Hot", color: "red" },
      stats: { items: "500+", rating: "5.0★", reviews: "2K+" }
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Changed to 6 seconds for better readability
    return () => clearInterval(timer);
  }, [slides.length]);

  // Animated rotating text
  useEffect(() => {
    const textTimer = setInterval(() => {
      setAnimatedText((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(textTimer);
  }, [rotatingPhrases.length]);


  return (
    <div className="relative overflow-hidden min-h-screen flex items-center" 
      style={{ 
        backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '#ffffff',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.1) 100%)',
            filter: 'blur(40px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.1) 100%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          >
            {/* Left Content Section */}
            <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
              
              {/* Welcome Message for Logged In Users */}
              {isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold shadow-lg"
                >
                  <FaUserCircle className="text-lg" />
                  Welcome back, {userName}! 👋
                </motion.div>
              )}

              {/* Trust Badges with Animation */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md"
                  style={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                    color: mode === 'dark' ? '#4ade80' : '#15803d'
                  }}>
                  <FaShieldAlt className="text-base" /> 100% Secure
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md"
                  style={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe',
                    color: mode === 'dark' ? '#60a5fa' : '#1e40af'
                  }}>
                  <FaTruck className="text-base" /> Free Shipping
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md"
                  style={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(234, 179, 8, 0.2)' : '#fef3c7',
                    color: mode === 'dark' ? '#fbbf24' : '#a16207'
                  }}>
                  <FaStar className="text-base" /> 5.0 Rating
                </motion.span>
              </motion.div>

              {/* Main Heading with Gradient */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                {slides[currentSlide].title}
              </motion.h1>

              {/* Animated Rotating Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-16 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={animatedText}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-2xl lg:text-3xl font-bold"
                    style={{ color: mode === 'dark' ? '#f3f4f6' : '#1f2937' }}
                  >
                    ✨ {rotatingPhrases[animatedText]}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg lg:text-xl leading-relaxed"
                style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons with Hover Effects */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/allproducts')}
                  className="group px-8 py-4 rounded-2xl font-bold text-white text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  }}>
                  <FaShoppingBag className="text-xl" />
                  {slides[currentSlide].cta}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight className="text-xl" />
                  </motion.div>
                </motion.button>
                
                {/* Secondary CTA - Conditional */}
                {isLoggedIn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/order')}
                    className="px-8 py-4 rounded-2xl font-bold border-2 text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    style={{
                      borderColor: mode === 'dark' ? '#ec4899' : '#8b5cf6',
                      color: mode === 'dark' ? '#f3f4f6' : '#8b5cf6',
                      backgroundColor: mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'white'
                    }}>
                    <FaClipboardList className="text-xl" />
                    My Orders
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 rounded-2xl font-bold border-2 text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    style={{
                      borderColor: mode === 'dark' ? '#ec4899' : '#8b5cf6',
                      color: mode === 'dark' ? '#f3f4f6' : '#8b5cf6',
                      backgroundColor: mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'white'
                    }}>
                    <FaUserCircle className="text-xl" />
                    Create Account
                  </motion.button>
                )}
              </motion.div>

              {/* Stats Section with Animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-gray-200"
                style={{ borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                <motion.div whileHover={{ scale: 1.1 }} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    10K+
                  </p>
                  <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    Happy Customers
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    500+
                  </p>
                  <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    Quality Products
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    4.9 ⭐
                  </p>
                  <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    Customer Rating
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Image Section with Parallax */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 relative w-full max-w-2xl"
            >
              {/* Main Product Image with 3D Effect */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -5
                }}
                transition={{ duration: 0.4 }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* Image with gradient overlay */}
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-auto object-cover"
                    style={{
                      aspectRatio: '4/3',
                      maxHeight: '600px'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.3) 100%)'
                    }}
                  />
                </div>

                {/* Floating Badge - Top Right */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -right-6 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md"
                  style={{
                    background: mode === 'dark' 
                      ? 'rgba(17, 24, 39, 0.9)' 
                      : 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid',
                    borderColor: slides[currentSlide].badge.color === 'orange' ? '#f97316' :
                                 slides[currentSlide].badge.color === 'purple' ? '#a855f7' :
                                 slides[currentSlide].badge.color === 'yellow' ? '#eab308' :
                                 slides[currentSlide].badge.color === 'green' ? '#22c55e' :
                                 slides[currentSlide].badge.color === 'red' ? '#ef4444' :
                                 slides[currentSlide].badge.color === 'blue' ? '#3b82f6' :
                                 slides[currentSlide].badge.color === 'pink' ? '#ec4899' :
                                 slides[currentSlide].badge.color === 'indigo' ? '#6366f1' :
                                 slides[currentSlide].badge.color === 'teal' ? '#14b8a6' : '#8b5cf6'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                      {(() => {
                        const IconComponent = slides[currentSlide].badge.icon;
                        return <IconComponent className="text-xl text-white" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-bold text-lg" style={{ color: mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                        {slides[currentSlide].badge.text}
                      </p>
                      <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Special Offer
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Discount Badge - Bottom Left */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  }}
                >
                  <div className="text-center text-white">
                    <p className="text-2xl font-extrabold">70%</p>
                    <p className="text-xs font-bold">OFF</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Navigation Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-3 mt-12"
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide ? 'h-3 w-12' : 'h-3 w-3'
              }`}
              style={{
                background: index === currentSlide 
                  ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  : mode === 'dark' ? '#374151' : '#d1d5db'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;