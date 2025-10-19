# Premium Hero Section - Complete Code

This is the complete premium hero section code ready to implement:

```jsx
return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden h-screen flex items-center" 
      style={{ 
        backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
      }}
    >
      {/* Premium Animated Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity }}
      >
        {/* Dynamic Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: mode === 'dark'
              ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.2) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 100%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: mode === 'dark'
              ? 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 100%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${mode === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${mode === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left Content - Text & CTA */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Welcome Badge */}
              {isLoggedIn && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-sm font-bold shadow-2xl"
                >
                  <FaUserCircle className="text-lg" />
                  <span>Welcome back, {userName}!</span>
                  <motion.span
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    👋
                  </motion.span>
                </motion.div>
              )}

              {/* Category Chips */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        const newIndex = slides.findIndex(s => s.category === cat.id || cat.id === 'all');
                        if (newIndex !== -1) setCurrentSlide(newIndex);
                      }}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : mode === 'dark'
                          ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="text-base" />
                      {cat.name}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight"
                  style={{ 
                    background: mode === 'dark' 
                      ? 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {slides[currentSlide].title}
                </h1>
                
                {/* Animated Rotating Subtitle */}
                <div className="h-12 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={animatedText}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold"
                      style={{ 
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ✨ {rotatingPhrases[animatedText]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl lg:text-2xl leading-relaxed"
                  style={{ color: mode === 'dark' ? '#cbd5e1' : '#64748b' }}
                >
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>

              {/* Smart Search Bar */}
              <motion.div variants={itemVariants} className="relative">
                <motion.div
                  animate={{
                    scale: searchFocused ? 1.02 : 1,
                    boxShadow: searchFocused 
                      ? '0 20px 60px rgba(236, 72, 153, 0.3)'
                      : '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }}
                  className="relative"
                >
                  <FaSearch 
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl"
                    style={{ color: mode === 'dark' ? '#64748b' : '#94a3b8' }}
                  />
                  <input
                    type="text"
                    placeholder="Search for premium products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    className="w-full pl-14 pr-6 py-5 rounded-2xl text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      backgroundColor: mode === 'dark' ? '#1e293b' : '#f8fafc',
                      color: mode === 'dark' ? '#ffffff' : '#1e293b',
                      border: `2px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`
                    }}
                  />
                </motion.div>

                {/* Search Suggestions */}
                <AnimatePresence>
                  {searchFocused && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 w-full rounded-xl shadow-2xl overflow-hidden z-50"
                      style={{
                        backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
                        border: `1px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`
                      }}
                    >
                      {searchSuggestions
                        .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map((suggestion, index) => (
                          <motion.div
                            key={suggestion}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              setSearchQuery(suggestion);
                              navigate('/allproducts');
                            }}
                            className="px-5 py-3 cursor-pointer transition-colors duration-200"
                            style={{
                              color: mode === 'dark' ? '#e2e8f0' : '#334155',
                              backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = mode === 'dark' ? '#334155' : '#f1f5f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <FaSearch className="inline mr-3 text-sm" />
                            {suggestion}
                          </motion.div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/allproducts')}
                  className="group px-8 py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaShoppingBag className="text-xl" />
                    {slides[currentSlide].cta}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaArrowRight className="text-xl" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(isLoggedIn ? '/order' : '/signup')}
                  className="px-8 py-5 rounded-2xl font-bold text-lg border-2 flex items-center justify-center gap-3 transition-all duration-300"
                  style={{
                    borderColor: mode === 'dark' ? '#8b5cf6' : '#ec4899',
                    color: mode === 'dark' ? '#e0e7ff' : '#8b5cf6',
                    backgroundColor: mode === 'dark' ? '#1e293b' : '#faf5ff'
                  }}
                >
                  <FaUserCircle className="text-xl" />
                  {isLoggedIn ? 'My Orders' : 'Create Account'}
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-8 pt-6 border-t"
                style={{ borderColor: mode === 'dark' ? '#334155' : '#e2e8f0' }}
              >
                {slides[currentSlide].stats && Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="text-center"
                  >
                    <p className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {value}
                    </p>
                    <p className="text-sm font-medium capitalize" style={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                      {key}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Product Image */}
            <motion.div 
              style={{ y }}
              className="relative"
            >
              <motion.div
                animate={floatingAnimation}
                className="relative"
              >
                {/* Main Product Image with 3D Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-auto object-cover"
                    style={{
                      aspectRatio: '3/4',
                      maxHeight: '700px'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(139,92,246,0.6) 100%)'
                    }}
                  />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute top-8 right-8 px-6 py-3 rounded-2xl backdrop-blur-xl shadow-2xl"
                    style={{
                      background: mode === 'dark' 
                        ? 'rgba(15, 23, 42, 0.9)' 
                        : 'rgba(255, 255, 255, 0.95)',
                      border: '2px solid',
                      borderColor: slides[currentSlide].badge.color === 'orange' ? '#f97316' :
                                   slides[currentSlide].badge.color === 'purple' ? '#a855f7' :
                                   slides[currentSlide].badge.color === 'blue' ? '#3b82f6' :
                                   slides[currentSlide].badge.color === 'pink' ? '#ec4899' :
                                   slides[currentSlide].badge.color === 'red' ? '#ef4444' : '#8b5cf6'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = slides[currentSlide].badge.icon;
                        return (
                          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                            <Icon className="text-xl text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-black text-lg" style={{ color: mode === 'dark' ? '#ffffff' : '#1e293b' }}>
                          {slides[currentSlide].badge.text}
                        </p>
                        <p className="text-xs font-medium" style={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                          Collection
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Discount Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="absolute bottom-8 left-8 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                    }}
                  >
                    <div className="text-center text-white">
                      <p className="text-3xl font-black">UP TO</p>
                      <p className="text-2xl font-black">70% OFF</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Product Cards - Mini Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-8 -left-8 hidden lg:block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="w-48 h-32 rounded-2xl backdrop-blur-xl shadow-2xl p-4 flex items-center gap-3"
                    style={{
                      background: mode === 'dark' 
                        ? 'rgba(15, 23, 42, 0.9)' 
                        : 'rgba(255, 255, 255, 0.95)',
                      border: `1px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <FaTruck className="text-white text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: mode === 'dark' ? '#ffffff' : '#1e293b' }}>
                        FREE
                      </p>
                      <p className="text-xs font-bold" style={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                        Shipping
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -bottom-8 -right-8 hidden lg:block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-48 h-32 rounded-2xl backdrop-blur-xl shadow-2xl p-4 flex items-center gap-3"
                    style={{
                      background: mode === 'dark' 
                        ? 'rgba(15, 23, 42, 0.9)' 
                        : 'rgba(255, 255, 255, 0.95)',
                      border: `1px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <FaShieldAlt className="text-white text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: mode === 'dark' ? '#ffffff' : '#1e293b' }}>
                        100%
                      </p>
                      <p className="text-xs font-bold" style={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                        Secure
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Navigation Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center gap-3 mt-16"
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-16 h-3' : 'w-3 h-3'
              }`}
              style={{
                background: index === currentSlide 
                  ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  : mode === 'dark' ? '#334155' : '#cbd5e1'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-sm font-semibold" style={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
              Scroll to explore
            </span>
            <FaChevronDown 
              className="text-2xl"
              style={{ color: mode === 'dark' ? '#8b5cf6' : '#ec4899' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
```

## Key Features Implemented:

1. **Full Viewport Height (100vh)**
2. **Framer Motion Animations**
   - Smooth entrance animations
   - Hover effects
   - Parallax scrolling
   - Staggered animations
3. **Smart Search Integration**
   - Expandable search bar
   - Auto-suggestions
   - Focus animations
4. **Category Filter Chips**
   - Interactive category selection
   - Smooth transitions
5. **Dynamic Product Carousel**
   - Auto-rotation (6s)
   - Manual navigation
6. **Premium Visual Elements**
   - 3D hover effects
   - Floating badges
   - Gradient backgrounds
   - Glass morphism
7. **Microinteractions**
   - Button hover effects
   - Scale animations
   - Color transitions
8. **Responsive Design**
   - Mobile-optimized
   - Tablet support
   - Desktop experience
9. **Scroll Indicator**
   - Animated chevron
   - Smooth scroll
10. **Background Animations**
    - Dynamic gradients
    - Grid pattern
    - Parallax effect
