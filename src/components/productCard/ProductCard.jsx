import { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import { FaShoppingCart, FaEye, FaHeart, FaStar } from 'react-icons/fa'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product ,searchkey, filterType, filterPrice, 
            wishlist, getWishlistData, addToWishlistBackend, removeFromWishlistBackend} = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state)=> state.cart);

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = user?.user?.uid;

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [imageIntervals, setImageIntervals] = useState({});

    // Helpers
    const isValidUrl = (url) => {
        if (!url || typeof url !== 'string') return false;
        if (!/^https?:\/\//i.test(url)) return false; // restrict to http/https
        try { new URL(url); return true; } catch { return false; }
    };

    // Get product images - handle both single and multiple images and filter invalid
    const getProductImages = (item) => {
        const arr = (item.images && Array.isArray(item.images) && item.images.length > 0) ? item.images : [item.imageUrl];
        const valid = arr.filter((u) => typeof u === 'string' && isValidUrl(u));
        return valid.length ? valid : [];
    };

    // Keep cart state serializable; strip Firestore Timestamp and unneeded fields
    const sanitizeForCart = (p) => {
        const safe = { ...p };
        if (safe.time && typeof safe.time === 'object') {
            try { safe.time = Date.now(); } catch { delete safe.time; }
        }
        const images = getProductImages(safe);
        return {
            id: safe.id,
            title: safe.title,
            price: safe.price,
            imageUrl: images[0] || (isValidUrl(safe.imageUrl) ? safe.imageUrl : ''),
            description: safe.description,
        };
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const addCart = (product)=> {
        const payload = sanitizeForCart(product);
        dispatch(addToCart(payload));
        toast.success('Added to cart successfully! 🛒');
    }

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
    }, [cartItems])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <h1 
                            className="sm:text-4xl text-3xl font-bold title-font text-gray-900 animate-fade-in" 
                            style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                            Featured Products
                        </h1>
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-full animate-bounce-subtle">
                            HOT 🔥
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
                        <div className="h-1 w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                        <div className="h-1 w-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                        Handpicked products just for you ✨
                    </p>
                </div>

                <div className="flex flex-wrap -m-4">
                    {product.filter((obj)=> obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => obj.category.toLowerCase().includes(filterType))
                     .filter((obj) => obj.price.includes(filterPrice)).slice(0,8).map((item, index) => {
                        const { title, price, id, category } = item;
                        const isInWishlist = wishlist.some(wishItem => wishItem.productId === id);
                        const productImages = getProductImages(item);
                        const currentImg = currentImageIndex[id] || 0;
                        
                        return (
                            <div 
                                key={index} 
                                className="p-4 md:w-1/4 drop-shadow-lg animate-fade-in"
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
                                    className="h-full border-2 rounded-2xl overflow-hidden group relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" 
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
                                        onClick={()=> window.location.href = `/productinfo/${id}`} 
                                        className="relative cursor-pointer overflow-hidden h-80"
                                    >
                                        {/* Images with crossfade animation */}
                                        {(productImages.length ? productImages : ['https://via.placeholder.com/600x600?text=No+Image']).map((img, imgIdx) => (
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
                                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
                                            />
                                        ))}
                                        
                                        {/* Image Counter Badge */}
                                        {productImages.length > 1 && (
                                            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-10">
                                                {currentImg + 1}/{productImages.length}
                                            </div>
                                        )}

                                        {/* Manual Navigation Dots */}
                                        {productImages.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
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
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                            dotIdx === currentImg 
                                                                ? 'bg-pink-500 w-6' 
                                                                : 'bg-white bg-opacity-50 hover:bg-opacity-100'
                                                        }`}
                                                        style={{
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        
                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-3">
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
                                            <div className="absolute top-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg animate-bounce-subtle">
                                                <FaHeart size={16} />
                                            </div>
                                        )}

                                        {/* Featured Badge */}
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                                            style={{
                                                backgroundColor: 'rgba(236, 72, 153, 0.9)',
                                                color: 'white'
                                            }}>
                                            {category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 border-t-2" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                                        <h2 
                                            className="tracking-widest text-xs title-font font-medium mb-1 uppercase" 
                                            style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
                                        >
                                            E-Bharat
                                        </h2>
                                        <h1 
                                            className="title-font text-lg font-bold mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors duration-300" 
                                            style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                                        >
                                            {title}
                                        </h1>
                                        
                                        {/* Price and Rating */}
                                        <div className="flex items-center justify-between mb-3">
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

                                        {/* Add to Cart Button */}
                                        <button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addCart(item);
                                            }}
                                            className="w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                                            style={{
                                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                                color: 'white'
                                            }}
                                        >
                                            <FaShoppingCart />
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section >
    )
}

export default ProductCard