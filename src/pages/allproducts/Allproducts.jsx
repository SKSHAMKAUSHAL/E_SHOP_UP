import { useContext, useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaEye, FaHeart, FaStar, FaThList } from 'react-icons/fa';
import { BiGridAlt } from 'react-icons/bi';

function Allproducts() {
  const context = useContext(myContext);
  const {
    mode,
    product,
    searchkey,
    filterType,
    filterPrice,
    wishlist,
    getWishlistData,
    addToWishlistBackend,
    removeFromWishlistBackend,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId = user?.user?.uid;

  // State for view mode and animations
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [imageIntervals, setImageIntervals] = useState({});

  // Get product images - handle both single and multiple images
  const getProductImages = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }
    return [item.imageUrl];
  };

  // Start auto slideshow on hover
  const startImageSlideshow = (productId, images) => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [productId]: ((prev[productId] || 0) + 1) % images.length
      }));
    }, 2000); // Change image every 2 seconds
    
    setImageIntervals(prev => ({ ...prev, [productId]: interval }));
  };

  // Stop slideshow when hover ends
  const stopImageSlideshow = (productId) => {
    if (imageIntervals[productId]) {
      clearInterval(imageIntervals[productId]);
      setImageIntervals(prev => {
        const newIntervals = { ...prev };
        delete newIntervals[productId];
        return newIntervals;
      });
    }
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: 0
    }));
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(imageIntervals).forEach(interval => clearInterval(interval));
    };
  }, [imageIntervals]);

  // Load wishlist on component mount
  useEffect(() => {
    if (userId) {
      getWishlistData(userId);
    }
  }, [userId]);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart successfully! 🛒');
  };

  const toggleWishlist = (product) => {
    if (!userId) {
      toast.error('Please login to add to wishlist');
      window.location.href = '/login';
      return;
    }

    const isInWishlist = wishlist.some(item => item.productId === product.id);
    
    if (isInWishlist) {
      const wishlistItem = wishlist.find(item => item.productId === product.id);
      removeFromWishlistBackend(wishlistItem.id, userId);
    } else {
      addToWishlistBackend(product, userId);
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = product
      .filter((obj) => obj.title.toLowerCase().includes(searchkey))
      .filter((obj) => obj.category.toLowerCase().includes(filterType))
      .filter((obj) => obj.price.includes(filterPrice));

    // Sorting logic
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-4 sm:px-5 py-6 sm:py-8 md:py-16 mx-auto">
          {/* Enhanced Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
            <div className="lg:w-1/2 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-gray-900 animate-fade-in"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Our Latest Collection
                </h1>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-500 text-white text-xs sm:text-sm font-bold rounded-full animate-bounce-subtle">
                  {filteredProducts.length}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 sm:h-1 w-16 sm:w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
                <div className="h-0.5 sm:h-1 w-8 sm:w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                <div className="h-0.5 sm:h-1 w-4 sm:w-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                Discover our curated selection of premium products
              </p>
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full lg:w-auto">
              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg border-2 font-medium text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:border-pink-500 focus:outline-none focus:border-pink-500"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                    color: mode === 'dark' ? 'white' : '#1f2937',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                  }}
                >
                  <option value="default">🔄 Default</option>
                  <option value="price-low">💰 Low to High</option>
                  <option value="price-high">💸 High to Low</option>
                  <option value="name">🔤 A to Z</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 p-1 rounded-lg border-2"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                  borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                }}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-pink-500 text-white shadow-lg' 
                      : 'hover:bg-gray-100'
                  }`}
                  style={{
                    color: viewMode === 'grid' ? 'white' : (mode === 'dark' ? '#9ca3af' : '#6b7280')
                  }}
                  title="Grid View"
                >
                  <BiGridAlt size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-pink-500 text-white shadow-lg' 
                      : 'hover:bg-gray-100'
                  }`}
                  style={{
                    color: viewMode === 'list' ? 'white' : (mode === 'dark' ? '#9ca3af' : '#6b7280')
                  }}
                  title="List View"
                >
                  <FaThList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                <div className="text-6xl">😕</div>
                <h2 className="text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                  No Products Found
                </h2>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'flex flex-wrap -m-4' : 'space-y-4'}>
              {filteredProducts.map((item, index) => {
                const { title, price, id, category } = item;
                const isInWishlist = wishlist.some(wishItem => wishItem.productId === id);
                const productImages = getProductImages(item);
                const currentImg = currentImageIndex[id] || 0;
                
                return viewMode === 'grid' ? (
                  // Grid View
                  <div
                    key={index}
                    className="p-2 sm:p-4 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      if (productImages.length > 1) {
                        startImageSlideshow(id, productImages);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      stopImageSlideshow(id);
                    }}
                  >
                    <div
                      className="h-full border-2 rounded-xl sm:rounded-2xl overflow-hidden group relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                      style={{
                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                        color: mode === 'dark' ? 'white' : '',
                        borderColor: hoveredIndex === index 
                          ? (mode === 'dark' ? '#ec4899' : '#ec4899')
                          : (mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'),
                        boxShadow: hoveredIndex === index 
                          ? (mode === 'dark' ? '0 20px 40px rgba(236, 72, 153, 0.3)' : '0 20px 40px rgba(236, 72, 153, 0.2)')
                          : ''
                      }}
                    >
                      {/* Image Container with Slideshow */}
                      <div 
                        onClick={() => window.location.href = `/productinfo/${id}`}
                        className="relative cursor-pointer overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80"
                      >
                        {/* Images with crossfade animation */}
                        {productImages.map((img, imgIdx) => (
                          <img
                            key={imgIdx}
                            className={`absolute inset-0 w-full h-full object-cover p-2 transition-all duration-700 ${
                              imgIdx === currentImg 
                                ? 'opacity-100 scale-110' 
                                : 'opacity-0 scale-100'
                            } group-hover:rotate-1`}
                            src={img}
                            alt={`${title} - ${imgIdx + 1}`}
                            loading="lazy"
                          />
                        ))}
                        
                        {/* Image Counter Badge */}
                        {productImages.length > 1 && (
                          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-60 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold backdrop-blur-sm z-10">
                            {currentImg + 1}/{productImages.length}
                          </div>
                        )}

                        {/* Manual Navigation Dots */}
                        {productImages.length > 1 && (
                          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5 z-10">
                            {productImages.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [id]: dotIdx
                                  }));
                                }}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                                  dotIdx === currentImg 
                                    ? 'bg-pink-500 w-4 sm:w-6' 
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-100'
                                }`}
                                style={{
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Overlay Actions - hidden on small mobile */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 hidden sm:flex items-center justify-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `/productinfo/${id}`;
                            }}
                            className="transform scale-0 group-hover:scale-100 transition-transform duration-300 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white"
                          >
                            <FaEye size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(item);
                            }}
                            className={`transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 p-3 rounded-full shadow-lg ${
                              isInWishlist 
                                ? 'bg-pink-500 text-white' 
                                : 'bg-white text-gray-900 hover:bg-pink-500 hover:text-white'
                            }`}
                          >
                            <FaHeart size={20} />
                          </button>
                        </div>

                        {/* Wishlist Badge */}
                        {isInWishlist && (
                          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-pink-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg animate-bounce-subtle z-10">
                            <FaHeart size={12} className="sm:w-4 sm:h-4" />
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm z-10"
                          style={{
                            backgroundColor: 'rgba(236, 72, 153, 0.9)',
                            color: 'white'
                          }}>
                          {category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-5 border-t-2" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                        <h2
                          className="tracking-widest text-xs title-font font-medium mb-1 uppercase hidden sm:block"
                          style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
                        >
                          SHOP UP
                        </h2>
                        <h1
                          className="title-font text-sm sm:text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors duration-300"
                          style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                        >
                          {title}
                        </h1>
                        
                        {/* Price and Rating */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600">
                            ₹{price}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <FaStar className="text-xs sm:text-sm" />
                            <span className="text-xs sm:text-sm font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                              4.5
                            </span>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addCart(item);
                          }}
                          className="w-full py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 touch-manipulation"
                          style={{
                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                            color: 'white'
                          }}
                        >
                          <FaShoppingCart className="text-xs sm:text-base" />
                          <span className="hidden xs:inline">Add To Cart</span>
                          <span className="xs:hidden">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div
                    key={index}
                    className="p-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className="flex flex-col md:flex-row gap-4 border-2 rounded-2xl overflow-hidden p-4 transition-all duration-300 hover:shadow-xl"
                      style={{
                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                        borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                      }}
                    >
                      {/* Image */}
                      <div 
                        onClick={() => window.location.href = `/productinfo/${id}`}
                        className="md:w-48 w-full cursor-pointer relative"
                      >
                        <img
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                          src={productImages[0]}
                          alt={title}
                        />
                        {productImages.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-bold">
                            +{productImages.length - 1}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h1
                              className="text-xl font-bold hover:text-pink-500 transition-colors cursor-pointer"
                              style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                              onClick={() => window.location.href = `/productinfo/${id}`}
                            >
                              {title}
                            </h1>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className={`p-2 rounded-full transition-all ${
                                isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                              }`}
                            >
                              <FaHeart size={20} />
                            </button>
                          </div>
                          <p className="text-sm mb-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                            Category: {category}
                          </p>
                          <div className="flex items-center gap-4 mb-3">
                            <p className="text-2xl font-bold text-pink-600">
                              ₹{price}
                            </p>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <FaStar />
                              <span className="text-sm font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                4.5
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => addCart(item)}
                            className="flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                            style={{
                              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                              color: 'white'
                            }}
                          >
                            <FaShoppingCart />
                            Add To Cart
                          </button>
                          <button
                            onClick={() => window.location.href = `/productinfo/${id}`}
                            className="px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 border-2 border-pink-500 hover:bg-pink-500"
                            style={{
                              color: mode === 'dark' ? 'white' : '#ec4899',
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'white'}
                            onMouseLeave={(e) => e.target.style.color = mode === 'dark' ? 'white' : '#ec4899'}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;
