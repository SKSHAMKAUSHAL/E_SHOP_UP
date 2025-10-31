import { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { FaHeart, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ProductInfo() {
    const context = useContext(myContext);
    const { setLoading, wishlist, getWishlistData, addToWishlistBackend, removeFromWishlistBackend, mode } = context;

    const [products, setProducts] = useState('')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const params = useParams()
    
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = user?.user?.uid;

    // Get product images
    const productImages = products && products.images && Array.isArray(products.images) && products.images.length > 0 
        ? products.images 
        : products.imageUrl ? [products.imageUrl] : [];

    const getProductData = async () => {
        setLoading(true)
        try {
            const productSnap = await getDoc(doc(fireDB, "products", params.id))
            const data = productSnap.data();
            // Ensure id exists for wishlist/cart logic
            setProducts({ id: productSnap.id || params.id, ...data });
            setLoading(false)
        } catch (error) {
            toast.error("Failed to load product")
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    const [selectedVariation, setSelectedVariation] = useState('');

    // Helper to validate URL
    const isValidUrl = (url) => {
        if (!url || typeof url !== 'string') return false;
        if (!/^https?:\/\//i.test(url)) return false; // restrict to http/https
        try { new URL(url); return true; } catch { return false; }
    };

    // Sanitize product before adding to cart to avoid non-serializable values (e.g., Firestore Timestamp)
    const sanitizeForCart = (p, selectedVariation) => {
        const safe = { ...p };
        // Remove or convert non-serializable values
        if (safe.time && typeof safe.time === 'object') {
            try {
                // Prefer milliseconds if available, else drop
                safe.time = Date.now();
            } catch {
                delete safe.time;
            }
        }
        // Keep only necessary fields to keep cart lean
        return {
            id: safe.id,
            title: safe.title,
            price: safe.price,
            imageUrl: Array.isArray(safe.images) && safe.images.length && isValidUrl(safe.images[0])
                ? safe.images[0]
                : (isValidUrl(safe.imageUrl) ? safe.imageUrl : ''),
            description: safe.description,
            selectedVariation: selectedVariation || ''
        };
    };

    // Load wishlist on component mount
    useEffect(() => {
        if (userId) {
            getWishlistData(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // add to cart
    const addCart = (products) => {
        const payload = sanitizeForCart(products, selectedVariation);
        dispatch(addToCart(payload))
        toast.success('add to cart');
    }

    // toggle wishlist
    const toggleWishlist = () => {
        if (!userId) {
            toast.error('Please login to add to wishlist');
            window.location.href = '/login';
            return;
        }

        const isInWishlist = wishlist.some(item => item.productId === products.id);
        
        if (isInWishlist) {
            const wishlistItem = wishlist.find(item => item.productId === products.id);
            removeFromWishlistBackend(wishlistItem.id, userId);
        } else {
            addToWishlistBackend(products, userId);
        }
    }

    const isInWishlist = wishlist.some(item => item.productId === products.id);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])




    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden" style={{ 
                backgroundColor: mode === 'dark' ? 'rgb(15, 23, 42)' : 'white' 
            }}>
                <div className="container px-5 py-10 mx-auto">
                    {products && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap gap-8">
                        {/* Image Gallery Section */}
                        <div className="lg:w-2/5 w-full">
                            {/* Main Image */}
                            <div className="relative mb-4 rounded-2xl overflow-hidden border-2 group" style={{
                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb',
                                backgroundColor: mode === 'dark' ? 'rgb(30, 41, 59)' : '#f8fafc'
                            }}>
                                {isValidUrl(productImages[selectedImageIndex]) ? (
                                    <img
                                        alt={products.title}
                                        className="w-full max-h-[500px] md:max-h-[600px] object-contain transition-transform duration-300 group-hover:scale-105"
                                        src={productImages[selectedImageIndex]}
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
                                    />
                                ) : (
                                    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center text-sm"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(30, 41, 59)' : '#f1f5f9' }}
                                    >No image available</div>
                                )}
                                
                                {/* Navigation Arrows */}
                                {productImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImageIndex((prev) => 
                                                prev === 0 ? productImages.length - 1 : prev - 1
                                            )}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                        >
                                            <FaChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImageIndex((prev) => 
                                                (prev + 1) % productImages.length
                                            )}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                        >
                                            <FaChevronRight size={20} />
                                        </button>
                                        
                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                                            {selectedImageIndex + 1} / {productImages.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {productImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                                                idx === selectedImageIndex 
                                                    ? 'border-pink-500 scale-105 shadow-lg' 
                                                    : 'border-transparent'
                                            }`}
                                            style={{
                                                borderColor: idx === selectedImageIndex ? '#ec4899' : (mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb')
                                            }}
                                        >
                                            {isValidUrl(img) ? (
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    className="w-full h-20 object-cover"
                                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Img'; }}
                                                />
                                            ) : (
                                                <div className="w-full h-20 flex items-center justify-center text-xs"
                                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(30, 41, 59)' : '#f1f5f9' }}
                                                >No Img</div>
                                            )}
                                            {idx === selectedImageIndex && (
                                                <div className="absolute inset-0 bg-pink-500 bg-opacity-20"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details Section */}
                        <div className="lg:w-1/2 w-full lg:py-6"
                            style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                        >
                            <h2 className="text-sm title-font tracking-widest mb-2 uppercase"
                                style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
                            >
                                SHOP UP
                            </h2>
                            <h1 className="text-4xl title-font font-bold mb-4"
                                style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                            >
                                {products.title}
                            </h1>
                            
                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b-2" style={{ 
                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' 
                            }}>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            fill={i < 4 ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5 text-yellow-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    4.5 (24 Reviews)
                                </span>
                            </div>
                            
                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-2" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    Product Description
                                </h3>
                                <p className="leading-relaxed text-base" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                    {products.description}
                                </p>
                            </div>

                            {/* Variations / Abilities */}
                            {(() => {
                                const type = (products?.type || '').toLowerCase();
                                const variations = Array.isArray(products?.variations) ? products.variations : [];
                                if (!type || variations.length === 0) return null;

                                let title = 'Available Options';
                                if (type === 'clothes') title = 'Available Sizes';
                                if (type === 'shoes') title = 'Available Shoe Sizes';
                                if (type === 'liquid' || type === 'perfume' || type === 'perfume/liquid') title = 'Available Volumes';

                                return (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold mb-2" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                            {title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {variations.map((v) => {
                                                const active = selectedVariation === v;
                                                return (
                                                    <button
                                                        key={v}
                                                        onClick={() => setSelectedVariation(v)}
                                                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'text-white' : ''}`}
                                                        style={{
                                                            backgroundColor: active ? '#ec4899' : (mode === 'dark' ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.03)'),
                                                            color: active ? '#ffffff' : (mode === 'dark' ? '#e5e7eb' : '#374151'),
                                                            borderColor: active ? '#ec4899' : '#ec4899'
                                                        }}
                                                    >
                                                        {v}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Price and Actions */}
                            <div className="border-t-2 pt-6" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm mb-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                            Price
                                        </p>
                                        <span className="text-4xl font-bold text-pink-600">
                                            ₹{products.price}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm mb-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                            Availability
                                        </p>
                                        <span className="text-lg font-semibold text-green-600">
                                            In Stock
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button  
                                        onClick={() => {
                                            // If product has variations, ensure one is selected
                                            const hasVariations = Array.isArray(products?.variations) && products.variations.length > 0;
                                            if (hasVariations && !selectedVariation) {
                                                toast.error('Please select a variation before adding to cart');
                                                return;
                                            }
                                            addCart({ ...products, selectedVariation });
                                        }} 
                                        className="flex-1 py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 text-white"
                                        style={{
                                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                        }}
                                    >
                                        <FaShoppingCart size={20} />
                                        Add To Cart
                                    </button>
                                    
                                    <button 
                                        onClick={toggleWishlist}
                                        className={`py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                                            isInWishlist 
                                                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50' 
                                                : 'border-2 border-pink-500 hover:bg-pink-500'
                                        }`}
                                        style={{
                                            color: isInWishlist ? 'white' : '#ec4899',
                                            borderColor: '#ec4899'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isInWishlist) {
                                                e.target.style.color = 'white';
                                                e.target.style.backgroundColor = '#ec4899';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isInWishlist) {
                                                e.target.style.color = '#ec4899';
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <FaHeart size={20} className={isInWishlist ? 'animate-pulse' : ''} />
                                        {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4 mt-6 p-4 rounded-xl" style={{
                                    backgroundColor: mode === 'dark' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.05)'
                                }}>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm font-medium" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                            Free Shipping
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                            Quality Guaranteed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className="text-sm font-medium" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                            Secure Payment
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-sm font-medium" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                            Easy Returns
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>

        </Layout>
    )
}

export default ProductInfo