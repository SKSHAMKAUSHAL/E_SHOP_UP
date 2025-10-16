import { useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { getThemeColors, getThemeShadow } from '../../../utils/colorUtils';
import Logo from '../../../components/logo/Logo';

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct, mode } = context;
    const colors = getThemeColors(mode);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/image1.jpg" 
                    alt="Background"
                    className="w-full h-full object-cover"
                    style={{ filter: mode === 'dark' ? 'brightness(0.6)' : 'brightness(0.85)' }}
                />
                <div className="absolute inset-0" 
                    style={{ 
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.95) 100%)'
                            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.85) 0%, rgba(241, 245, 249, 0.95) 100%)'
                    }}>
                </div>
            </div>

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-2xl animate-fade-in">
                <div className='backdrop-blur-md px-8 py-8 rounded-2xl'
                    style={{
                        backgroundColor: colors.surface.main,
                        boxShadow: getThemeShadow(mode, 'xl'),
                        border: `1px solid ${colors.border.main}`,
                    }}>
                    
                    {/* Header with Logo */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Logo 
                                size="medium" 
                                showText={true} 
                                variant={mode === 'dark' ? 'white' : 'gradient'}
                            />
                        </div>
                        <h1 className='text-2xl font-bold mb-2' 
                            style={{ color: colors.text.primary }}>
                            Add New Product
                        </h1>
                        <p className="text-sm" style={{ color: colors.text.secondary }}>
                            Fill in the product details below
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Product Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
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
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product title'
                            />
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
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
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter price'
                            />
                        </div>

                        {/* Product Image URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Image URL
                            </label>
                            <input
                                type="text"
                                value={products.imageUrl}
                                onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                                name='imageUrl'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter image URL'
                            />
                        </div>

                        {/* Product Category */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
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
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter category'
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Description
                            </label>
                            <textarea
                                cols="30"
                                rows="4"
                                name='description'
                                value={products.description}
                                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300 resize-none'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                placeholder='Enter product description'>
                            </textarea>
                        </div>

                        {/* Add Product Button */}
                        <button
                            onClick={addProduct}
                            className='w-full font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-white'
                            style={{
                                backgroundColor: colors.primary.main,
                                boxShadow: `0 4px 14px 0 ${colors.primary.main}40`,
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary.hover}
                            onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary.main}>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct