import { useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { getThemeColors, getThemeShadow } from '../../../utils/colorUtils';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct, mode } = context;
    const colors = getThemeColors(mode);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/image1.jpg" 
                    alt="Background"
                    className="w-full h-full object-cover"
                    style={{ filter: mode === 'dark' ? 'brightness(0.7)' : 'brightness(0.9)' }}
                />
                <div className="absolute inset-0" 
                    style={{ 
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.92) 100%)'
                            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.85) 0%, rgba(241, 245, 249, 0.92) 100%)'
                    }}>
                </div>
            </div>

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-2xl">
                <div 
                    className='backdrop-blur-md px-8 py-10 rounded-2xl transition-all duration-300'
                    style={{
                        backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        boxShadow: getThemeShadow(mode, 'xl'),
                        border: `1px solid ${colors.border.main}`,
                    }}>
                    
                    {/* Icon Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                            style={{
                                backgroundColor: colors.secondary.main,
                                boxShadow: `0 4px 14px 0 ${colors.secondary.main}60`,
                            }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h1 
                            className='text-3xl font-bold mb-2'
                            style={{ color: colors.text.primary }}>
                            Update Product
                        </h1>
                        <p 
                            className="text-sm"
                            style={{ color: colors.text.secondary }}>
                            Edit and update product information
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Product Title */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: colors.text.secondary }}>
                                Product Title
                            </label>
                            <input
                                type="text"
                                value={products.title}
                                onChange={(e) => setProducts({ ...products, title: e.target.value })}
                                name='title'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary,
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product title'
                            />
                        </div>

                        {/* Product Price */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: colors.text.secondary }}>
                                Price
                            </label>
                            <input
                                type="text"
                                value={products.price}
                                onChange={(e) => setProducts({ ...products, price: e.target.value })}
                                name='price'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary,
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product price'
                            />
                        </div>

                        {/* Product Image URL */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: colors.text.secondary }}>
                                Image URL
                            </label>
                            <input
                                type="text"
                                value={products.imageUrl}
                                onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                                name='imageurl'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary,
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter image URL'
                            />
                        </div>

                        {/* Product Category */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: colors.text.secondary }}>
                                Category
                            </label>
                            <input
                                type="text"
                                value={products.category}
                                onChange={(e) => setProducts({ ...products, category: e.target.value })}
                                name='category'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary,
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product category'
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: colors.text.secondary }}>
                                Description
                            </label>
                            <textarea
                                rows="4"
                                name='description'
                                value={products.description}
                                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300 resize-none'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary,
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product description'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={updateProduct}
                            className='w-full font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-white mt-6'
                            style={{
                                backgroundColor: colors.secondary.main,
                                boxShadow: `0 4px 14px 0 ${colors.secondary.main}40`,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = colors.secondary.hover;
                                e.target.style.boxShadow = `0 6px 20px 0 ${colors.secondary.main}60`;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = colors.secondary.main;
                                e.target.style.boxShadow = `0 4px 14px 0 ${colors.secondary.main}40`;
                            }}
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct