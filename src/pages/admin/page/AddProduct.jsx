import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { getThemeColors, getThemeShadow } from '../../../utils/colorUtils';
import Logo from '../../../components/logo/Logo';
import adminBgImage from '../../../assets/nordwood-themes-Nv4QHkTVEaI-unsplash.jpg';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct, mode, product, loading } = context;
    const colors = getThemeColors(mode);
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate all fields
    const validateFields = () => {
        const newErrors = {};
        
        if (!products.title || products.title.trim() === '') {
            newErrors.title = 'Product title is required';
        }
        
        if (!products.price || products.price.trim() === '') {
            newErrors.price = 'Price is required';
        } else if (isNaN(products.price) || parseFloat(products.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }
        
        if (!products.imageUrl || products.imageUrl.trim() === '') {
            newErrors.imageUrl = 'Image URL is required';
        } else if (!isValidUrl(products.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL';
        }
        
        if (!products.category || products.category.trim() === '') {
            newErrors.category = 'Category is required';
        }
        
        if (!products.description || products.description.trim() === '') {
            newErrors.description = 'Description is required';
        } else if (products.description.trim().length < 10) {
            newErrors.description = 'Description should be at least 10 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Check if URL is valid
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Check for duplicate products
    const checkDuplicateProduct = () => {
        const duplicate = product.find(p => 
            p.title.toLowerCase().trim() === products.title.toLowerCase().trim() &&
            p.category.toLowerCase().trim() === products.category.toLowerCase().trim()
        );
        return duplicate;
    };

    // Handle form submission
    const handleAddProduct = async () => {
        // Validate fields first
        if (!validateFields()) {
            return;
        }

        // Check for duplicates
        const duplicate = checkDuplicateProduct();
        if (duplicate) {
            return;
        }

        // Submit the product
        setIsSubmitting(true);
        await addProduct();
        setIsSubmitting(false);
        
        // Reset form after successful addition
        setProducts({
            title: '',
            price: '',
            imageUrl: '',
            category: '',
            description: '',
            time: null,
            date: null
        });
        setErrors({});
    };

    // Clear error when user starts typing
    const handleInputChange = (field, value) => {
        setProducts({ ...products, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={adminBgImage} 
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
                    
                    {/* Header with Logo - Clickable to Home */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4 cursor-pointer" onClick={() => navigate('/')}>
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
                                Product Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={products.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                name='title'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.title ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.title ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = errors.title ? '#ef4444' : colors.border.main}
                                placeholder='Enter product title'
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={products.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                name='price'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.price ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.price ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = errors.price ? '#ef4444' : colors.border.main}
                                placeholder='Enter price (e.g., 299.99)'
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Product Image URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Image URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={products.imageUrl || ''}
                                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                name='imageUrl'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.imageUrl ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.imageUrl ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = errors.imageUrl ? '#ef4444' : colors.border.main}
                                placeholder='Enter image URL'
                            />
                            {errors.imageUrl && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.imageUrl}
                                </p>
                            )}
                            {products.imageUrl && !errors.imageUrl && (
                                <div className="mt-2 rounded-lg overflow-hidden" style={{ maxHeight: '200px' }}>
                                    <img 
                                        src={products.imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            setErrors({ ...errors, imageUrl: 'Invalid image URL' });
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Product Category */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={products.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                name='category'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.category ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.category ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = errors.category ? '#ef4444' : colors.border.main}
                            >
                                <option value="">Select a category</option>
                                <option value="fashion">Fashion</option>
                                <option value="electronics">Electronics</option>
                                <option value="home">Home & Living</option>
                                <option value="sports">Sports & Outdoors</option>
                                <option value="books">Books & Media</option>
                                <option value="beauty">Beauty & Personal Care</option>
                                <option value="toys">Toys & Games</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                cols="30"
                                rows="4"
                                name='description'
                                value={products.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300 resize-none'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.description ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.description ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.target.style.borderColor = errors.description ? '#ef4444' : colors.border.main}
                                placeholder='Enter product description (min 10 characters)'>
                            </textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.description}
                                </p>
                            )}
                            <p className="mt-1 text-xs" style={{ color: colors.text.secondary }}>
                                {products.description ? products.description.length : 0} characters
                            </p>
                        </div>

                        {/* Add Product Button */}
                        <button
                            onClick={handleAddProduct}
                            disabled={isSubmitting || loading}
                            className='w-full font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                            style={{
                                backgroundColor: colors.primary.main,
                                boxShadow: `0 4px 14px 0 ${colors.primary.main}40`,
                            }}
                            onMouseEnter={(e) => !isSubmitting && !loading && (e.target.style.backgroundColor = colors.primary.hover)}
                            onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary.main}>
                            {isSubmitting || loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Adding Product...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle />
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct