import { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { FaTruck, FaShieldAlt, FaHeadset, FaUndo, FaCreditCard, FaAward } from 'react-icons/fa';

function Track() {
    const context = useContext(myContext);
    const { mode } = context;

    const features = [
        {
            icon: <FaTruck className="text-5xl" />,
            title: "Free Shipping",
            description: "Free delivery on all orders nationwide",
            color: "from-blue-500 to-blue-600",
            iconColor: "#3b82f6",
            bgLight: "#dbeafe",
            bgDark: "rgba(59, 130, 246, 0.1)"
        },
        {
            icon: <FaShieldAlt className="text-5xl" />,
            title: "Secure Payment",
            description: "100% secure payment with SSL encryption",
            color: "from-green-500 to-green-600",
            iconColor: "#22c55e",
            bgLight: "#dcfce7",
            bgDark: "rgba(34, 197, 94, 0.1)"
        },
        {
            icon: <FaHeadset className="text-5xl" />,
            title: "24/7 Support",
            description: "Dedicated customer support anytime",
            color: "from-purple-500 to-purple-600",
            iconColor: "#a855f7",
            bgLight: "#f3e8ff",
            bgDark: "rgba(168, 85, 247, 0.1)"
        },
        {
            icon: <FaUndo className="text-5xl" />,
            title: "Easy Returns",
            description: "30-day return policy for all products",
            color: "from-pink-500 to-pink-600",
            iconColor: "#ec4899",
            bgLight: "#fce7f3",
            bgDark: "rgba(236, 72, 153, 0.1)"
        },
        {
            icon: <FaCreditCard className="text-5xl" />,
            title: "Multiple Payments",
            description: "Accept all major payment methods",
            color: "from-yellow-500 to-yellow-600",
            iconColor: "#eab308",
            bgLight: "#fef3c7",
            bgDark: "rgba(234, 179, 8, 0.1)"
        },
        {
            icon: <FaAward className="text-5xl" />,
            title: "Quality Guaranteed",
            description: "100% authentic and quality products",
            color: "from-red-500 to-red-600",
            iconColor: "#ef4444",
            bgLight: "#fee2e2",
            bgDark: "rgba(239, 68, 68, 0.1)"
        }
    ];

    return (
        <div className="py-16" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : 'white' }}>
            <section>
                <div className="container mx-auto px-5">
                    {/* Section Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4"
                            style={{ 
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                            Why Choose Us?
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" 
                            style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                            Experience the best online shopping with premium services and guaranteed satisfaction
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
                            <div className="h-1 w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                            <div className="h-1 w-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in cursor-pointer"
                                style={{
                                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '#ffffff',
                                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#d1d5db',
                                    boxShadow: mode === 'dark' ? '' : '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                                    animationDelay: `${index * 0.1}s`
                                }}>
                                {/* Icon Container */}
                                <div className="mb-6 relative">
                                    <div
                                        className="inline-block p-6 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                        style={{
                                            backgroundColor: mode === 'dark' ? feature.bgDark : feature.bgLight
                                        }}>
                                        <div style={{ color: feature.iconColor }}>
                                            {feature.icon}
                                        </div>
                                    </div>
                                    
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                        style={{ backgroundColor: feature.iconColor }}></div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors duration-300"
                                    style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-base leading-relaxed"
                                    style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    {feature.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="mt-4 flex items-center gap-2 text-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                                    <span className="font-semibold">Learn More</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges Section */}
                    <div className="mt-16 p-8 rounded-2xl border-2 animate-fade-in"
                        style={{
                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '#f9fafb',
                            borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                        }}>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-pink-600 mb-2">10K+</p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Happy Customers
                                </p>
                            </div>
                            <div className="h-12 w-px bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}></div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-purple-600 mb-2">500+</p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Products
                                </p>
                            </div>
                            <div className="h-12 w-px bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}></div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-blue-600 mb-2">99%</p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Satisfaction Rate
                                </p>
                            </div>
                            <div className="h-12 w-px bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}></div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-600 mb-2">24/7</p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Support Available
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Track;