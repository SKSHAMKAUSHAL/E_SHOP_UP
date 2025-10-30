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
            const productTemp = await getDoc(doc(fireDB, "products", params.id))
            setProducts(productTemp.data());
            setLoading(false)
        } catch (error) {
            toast.error("Failed to load product")
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData()

    }, [])



    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    // Load wishlist on component mount
    useEffect(() => {
        if (userId) {
            getWishlistData(userId);
        }
    }, [userId]);

    // add to cart
    const addCart = (products) => {
        dispatch(addToCart(products))
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
                                <img
                                    alt={products.title}
                                    className="w-full max-h-[500px] md:max-h-[600px] object-contain transition-transform duration-300 group-hover:scale-105"
                                    src={productImages[selectedImageIndex]}
                                    loading="lazy"
                                />
                                
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
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-full h-20 object-cover"
                                            />
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
                                        onClick={() => addCart(products)} 
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