import { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { FaStar, FaQuoteLeft, FaQuoteRight, FaCheckCircle } from 'react-icons/fa';

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const testimonials = [
        {
            name: "Rajesh Kumar",
            role: "Business Owner",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            comment: "Exceptional quality and fast delivery! I've been shopping here for over a year and never disappointed. The customer service is outstanding and products are always authentic.",
            verified: true,
            date: "2 weeks ago"
        },
        {
            name: "Priya Sharma",
            role: "Fashion Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            comment: "Best online shopping experience! The website is easy to navigate, products are exactly as shown, and delivery is always on time. Highly recommended for quality shopping.",
            verified: true,
            date: "1 month ago"
        },
        {
            name: "Amit Patel",
            role: "Software Engineer",
            image: "https://randomuser.me/api/portraits/men/46.jpg",
            rating: 5,
            comment: "Trustworthy and reliable! Great collection of products with competitive prices. The return policy is hassle-free and customer support is very responsive. Will continue shopping here!",
            verified: true,
            date: "3 weeks ago"
        }
    ];

    return (
        <div className="py-16" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : 'white' }}>
            <section>
                <div className="container mx-auto px-5">
                    {/* Section Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4"
                            style={{ 
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                            Customer Testimonials
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4" 
                            style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                            What our <span className="text-pink-500">happy customers</span> say about us
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" 
                            style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                            Join thousands of satisfied customers who trust us for quality products and excellent service
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
                            <div className="h-1 w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                            <div className="h-1 w-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Overall Rating Stats */}
                    <div className="max-w-4xl mx-auto mb-12 p-8 rounded-2xl border-2 animate-fade-in"
                        style={{
                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '#f9fafb',
                            borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                        }}>
                        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-pink-600 mb-2">4.9</div>
                                <div className="flex justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-xl" />
                                    ))}
                                </div>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Based on 10,000+ reviews
                                </p>
                            </div>
                            <div className="h-20 w-px bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}></div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-green-600 mb-2">99%</div>
                                <p className="text-lg font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    Satisfaction Rate
                                </p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Customer approved
                                </p>
                            </div>
                            <div className="h-20 w-px bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}></div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-blue-600 mb-2">10K+</div>
                                <p className="text-lg font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    Happy Customers
                                </p>
                                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    And growing daily
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in"
                                style={{
                                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                    borderColor: hoveredIndex === index 
                                        ? (mode === 'dark' ? '#ec4899' : '#ec4899')
                                        : (mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'),
                                    boxShadow: hoveredIndex === index 
                                        ? (mode === 'dark' ? '0 20px 40px rgba(236, 72, 153, 0.3)' : '0 20px 40px rgba(236, 72, 153, 0.2)')
                                        : '',
                                    animationDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}>
                                
                                {/* Quote Icon Top */}
                                <FaQuoteLeft 
                                    className="absolute top-6 left-6 text-pink-200 text-3xl opacity-20"
                                    style={{ color: mode === 'dark' ? '#ec4899' : '' }} 
                                />
                                
                                {/* Profile Section */}
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="relative">
                                        <img 
                                            alt={testimonial.name}
                                            className="w-20 h-20 object-cover rounded-full border-4 border-pink-500 transition-transform duration-300 group-hover:scale-110"
                                            src={testimonial.image}
                                        />
                                        {testimonial.verified && (
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                                                <FaCheckCircle className="text-white text-sm" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg mb-1"
                                            style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                            {testimonial.name}
                                        </h2>
                                        <p className="text-sm mb-1"
                                            style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                            {testimonial.role}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500 text-sm" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="leading-relaxed mb-4 text-base relative z-10"
                                    style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                                    "{testimonial.comment}"
                                </p>

                                {/* Date and Verified Badge */}
                                <div className="flex items-center justify-between pt-4 border-t-2"
                                    style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                                    <span className="text-sm"
                                        style={{ color: mode === 'dark' ? '#9ca3af' : '#9ca3af' }}>
                                        {testimonial.date}
                                    </span>
                                    {testimonial.verified && (
                                        <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                            <FaCheckCircle />
                                            Verified Purchase
                                        </span>
                                    )}
                                </div>

                                {/* Quote Icon Bottom */}
                                <FaQuoteRight 
                                    className="absolute bottom-6 right-6 text-purple-200 text-3xl opacity-20"
                                    style={{ color: mode === 'dark' ? '#8b5cf6' : '' }} 
                                />

                                {/* Hover Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                                    style={{
                                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                        filter: 'blur(20px)',
                                        transform: 'scale(0.95)'
                                    }}></div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-12 animate-fade-in">
                        <p className="text-lg mb-6" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                            Join our community of happy customers today!
                        </p>
                        <button
                            onClick={() => window.location.href = '/signup'}
                            className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                            }}>
                            Start Shopping Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;