import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { getThemeColors, getThemeShadow } from '../../../utils/colorUtils';
import Logo from '../../../components/logo/Logo';
import updateBgImage from '../../../assets/vitaly-gariev-1JnN9QhmTGU-unsplash.jpg';
import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaCloudUploadAlt, FaTimes, FaImage } from 'react-icons/fa';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct, mode } = context;
    const colors = getThemeColors(mode);
    const navigate = useNavigate();

    // Local UI state similar to AddProduct
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrls, setImageUrls] = useState(['']);
    const [dragActive, setDragActive] = useState(false);
    const [customVariation, setCustomVariation] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');

    // Initialize image URL inputs from existing product
    useEffect(() => {
        const incoming = Array.isArray(products?.images) && products.images.length
            ? products.images
            : (products?.imageUrl ? [products.imageUrl] : ['']);
        setImageUrls(incoming.length ? incoming : ['']);
    }, [products?.images, products?.imageUrl]);

    // Validation helpers
    const isValidUrl = (string) => {
        if (!string || typeof string !== 'string') return false;
        if (!/^https?:\/\//i.test(string)) return false;
        try { new URL(string); return true; } catch { return false; }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!products.title || products.title.trim() === '') newErrors.title = 'Product title is required';
        if (!products.price || String(products.price).trim() === '') newErrors.price = 'Price is required';
        else if (isNaN(products.price) || parseFloat(products.price) <= 0) newErrors.price = 'Please enter a valid price';
        const validUrls = imageUrls.filter(url => url.trim() !== '' && isValidUrl(url));
        if (validUrls.length === 0) newErrors.imageUrl = 'At least one valid image URL is required';
        if (!products.category || products.category.trim() === '') newErrors.category = 'Category is required';
        if (!products.description || products.description.trim() === '') newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Image URL management
    const handleImageUrlChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
        const validUrls = newUrls.filter(url => url.trim() !== '');
        setProducts({
            ...products,
            imageUrl: validUrls[0] || '',
            images: validUrls
        });
        if (errors.imageUrl) setErrors({ ...errors, imageUrl: '' });
    };

    const addImageUrlInput = () => { if (imageUrls.length < 5) setImageUrls([...imageUrls, '']); };
    const removeImageUrl = (index) => {
        if (imageUrls.length > 1) {
            const newUrls = imageUrls.filter((_, i) => i !== index);
            setImageUrls(newUrls);
            const validUrls = newUrls.filter(url => url.trim() !== '');
            setProducts({ ...products, imageUrl: validUrls[0] || '', images: validUrls });
        }
    };
    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    // Variations helpers (same logic as AddProduct)
    const getPresetsByType = (type) => {
        switch ((type || '').toLowerCase()) {
            case 'clothes': return ['XS','S','M','L','XL','XXL','XXXL'];
            case 'shoes': return ['6','7','8','9','10','11','12'];
            case 'liquid':
            case 'perfume/liquid':
            case 'perfume': return ['50ml','100ml','200ml','500ml'];
            default: return [];
        }
    };
    const setTypeAndResetVariations = (value) => {
        setProducts({ ...products, type: value, variations: Array.isArray(products.variations) ? products.variations.filter(() => false) : [] });
        if (errors.variations) setErrors({ ...errors, variations: '' });
    };
    const toggleVariation = (val) => {
        const current = Array.isArray(products.variations) ? products.variations : [];
        const exists = current.includes(val);
        const next = exists ? current.filter(v => v !== val) : [...current, val];
        setProducts({ ...products, variations: next });
        if (errors.variations) setErrors({ ...errors, variations: '' });
    };
    const normalizedCustomValue = () => {
        const t = (products.type || '').toLowerCase();
        let val = customVariation.trim();
        if (!val) return '';
        if (t === 'clothes') return val.toUpperCase();
        if (t === 'shoes') return val.replace(/[^0-9.]/g, '');
        if (t === 'liquid' || t === 'perfume' || t === 'perfume/liquid') {
            const num = val.replace(/[^0-9.]/g, '');
            return num ? `${num}ml` : '';
        }
        return val;
    };
    const addCustomVariation = () => {
        const val = normalizedCustomValue(); if (!val) return;
        const current = Array.isArray(products.variations) ? products.variations : [];
        if (!current.includes(val)) {
            setProducts({ ...products, variations: [...current, val] });
            setCustomVariation('');
            if (errors.variations) setErrors({ ...errors, variations: '' });
        }
    };

    const handleUpdateProduct = async () => {
        if (!validateFields()) return;
        setIsSubmitting(true);
        await updateProduct();
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={updateBgImage} 
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
            <div className="relative z-10 w-full max-w-2xl animate-fade-in">
                <div 
                    className='backdrop-blur-md px-8 py-8 rounded-2xl'
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
                            Update Product
                        </h1>
                        <p className="text-sm" style={{ color: colors.text.secondary }}>
                            Modify the product details below
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
                                onChange={(e) => setProducts({ ...products, title: e.target.value })}
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
                                onChange={(e) => setProducts({ ...products, price: e.target.value })}
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

                        {/* Product Images - Multiple URLs */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Product Images <span className="text-red-500">*</span>
                                <span className="text-xs ml-2 font-normal">(Up to 5 images)</span>
                            </label>
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                className={`border-2 border-dashed rounded-lg p-6 mb-3 transition-all duration-300 ${
                                    dragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                                }`}
                                style={{
                                    backgroundColor: dragActive 
                                        ? (mode === 'dark' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.05)')
                                        : colors.surface.main,
                                    borderColor: errors.imageUrl ? '#ef4444' : (dragActive ? '#ec4899' : colors.border.main)
                                }}
                            >
                                <div className="text-center">
                                    <FaCloudUploadAlt 
                                        className="mx-auto mb-2" 
                                        size={40} 
                                        style={{ color: dragActive ? '#ec4899' : colors.text.secondary }} 
                                    />
                                    <p className="text-sm mb-1" style={{ color: colors.text.primary }}>
                                        Drag and drop images here or paste URLs below
                                    </p>
                                    <p className="text-xs" style={{ color: colors.text.secondary }}>
                                        Supports image URLs (JPG, PNG, WebP)
                                    </p>
                                </div>
                            </div>

                            {/* Image URL Inputs */}
                            <div className="space-y-3">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <FaImage style={{ color: colors.text.secondary }} />
                                                <input
                                                    type="text"
                                                    value={url}
                                                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                                    className='flex-1 px-4 py-2 rounded-lg outline-none border-2 transition-all duration-300 text-sm'
                                                    style={{
                                                        backgroundColor: colors.surface.main,
                                                        borderColor: colors.border.main,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                                                    onBlur={(e) => e.target.style.borderColor = colors.border.main}
                                                    placeholder={`Image URL ${index + 1}${index === 0 ? ' (Main Image)' : ''}`}
                                                />
                                            </div>
                                            {/* Preview */}
                                            {url && isValidUrl(url) && (
                                                <div className="mt-2 rounded-lg overflow-hidden border-2" 
                                                    style={{ 
                                                        maxHeight: '120px',
                                                        borderColor: colors.border.main 
                                                    }}>
                                                    <img 
                                                        src={url} 
                                                        alt={`Preview ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {imageUrls.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageUrl(index)}
                                                className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-300"
                                                style={{
                                                    backgroundColor: mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Add More Button */}
                            {imageUrls.length < 5 && (
                                <button
                                    type="button"
                                    onClick={addImageUrlInput}
                                    className="mt-3 w-full py-2 rounded-lg border-2 border-dashed font-medium text-sm transition-all duration-300 hover:border-pink-500 hover:bg-pink-50"
                                    style={{
                                        color: colors.text.secondary,
                                        borderColor: colors.border.main,
                                        backgroundColor: mode === 'dark' ? 'rgba(236, 72, 153, 0.05)' : 'transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#ec4899';
                                        e.currentTarget.style.color = '#ec4899';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = colors.border.main;
                                        e.currentTarget.style.color = colors.text.secondary;
                                    }}
                                >
                                    + Add Another Image ({imageUrls.length}/5)
                                </button>
                            )}

                            {errors.imageUrl && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.imageUrl}
                                </p>
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
                                onChange={(e) => setProducts({ ...products, category: e.target.value })}
                                name='category'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.category ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = errors.category ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.currentTarget.style.borderColor = errors.category ? '#ef4444' : colors.border.main}
                            >
                                <option value="">Select a category</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home & Living">Home & Living</option>
                                <option value="Sports & Outdoors">Sports & Outdoors</option>
                                <option value="Books & Media">Books & Media</option>
                                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                                <option value="Toys & Games">Toys & Games</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                    <FaExclamationCircle className="text-xs" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Product Type (drives variations) */}
                        <div>
                            <label className="block text-sm font-medium mb-2" 
                                style={{ color: colors.text.secondary }}>
                                Product Type (for variations)
                            </label>
                            <select
                                value={products.type || ''}
                                onChange={(e) => setTypeAndResetVariations(e.target.value)}
                                name='type'
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.border.focus}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.border.main}
                            >
                                <option value="">Not applicable</option>
                                <option value="clothes">Clothes</option>
                                <option value="shoes">Shoes</option>
                                <option value="liquid">Perfume/Liquid</option>
                                <option value="electronics">Electronics</option>
                            </select>
                        </div>

                        {/* Variations Input (shown only when type selected) */}
                        {(products.type || '').trim() !== '' && (
                            <div>
                                <label className="block text-sm font-medium mb-2" 
                                    style={{ color: colors.text.secondary }}>
                                    {products.type.toLowerCase() === 'clothes' && 'Available Sizes'}
                                    {products.type.toLowerCase() === 'shoes' && 'Available Shoe Sizes'}
                                    {(products.type.toLowerCase() === 'liquid' || products.type.toLowerCase() === 'perfume' || products.type.toLowerCase() === 'perfume/liquid') && 'Available Volumes'}
                                </label>

                                {products.type === 'electronics' ? (
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <select
                                                value={selectedRam || ''}
                                                onChange={(e) => setSelectedRam(e.target.value)}
                                                className='px-3 py-2 rounded-lg outline-none border-2'
                                                style={{ backgroundColor: colors.surface.main, borderColor: colors.border.main, color: colors.text.primary }}
                                            >
                                                <option value="">Select RAM</option>
                                                <option value="4GB">4GB</option>
                                                <option value="6GB">6GB</option>
                                                <option value="8GB">8GB</option>
                                                <option value="12GB">12GB</option>
                                            </select>
                                            <select
                                                value={selectedStorage || ''}
                                                onChange={(e) => setSelectedStorage(e.target.value)}
                                                className='px-3 py-2 rounded-lg outline-none border-2'
                                                style={{ backgroundColor: colors.surface.main, borderColor: colors.border.main, color: colors.text.primary }}
                                            >
                                                <option value="">Select Storage</option>
                                                <option value="64GB">64GB</option>
                                                <option value="128GB">128GB</option>
                                                <option value="256GB">256GB</option>
                                                <option value="512GB">512GB</option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!selectedRam || !selectedStorage) return;
                                                    const combo = `${selectedRam} RAM / ${selectedStorage} Storage`;
                                                    const current = Array.isArray(products.variations) ? products.variations : [];
                                                    if (!current.includes(combo)) {
                                                        setProducts({ ...products, variations: [...current, combo] });
                                                        setSelectedRam(''); setSelectedStorage('');
                                                    }
                                                }}
                                                className='px-4 py-2 rounded-lg font-semibold text-white'
                                                style={{ backgroundColor: '#ec4899' }}
                                            >
                                                Add Spec
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {(products.variations || []).map((p) => (
                                                <button
                                                    type="button"
                                                    key={p}
                                                    onClick={() => toggleVariation(p)}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all`}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        color: colors.text.primary,
                                                        borderColor: colors.border.main,
                                                    }}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {getPresetsByType(products.type).map((p) => {
                                                const active = (products.variations || []).includes(p);
                                                return (
                                                    <button
                                                        type="button"
                                                        key={p}
                                                        onClick={() => toggleVariation(p)}
                                                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'text-white' : ''}`}
                                                        style={{
                                                            backgroundColor: active ? '#ec4899' : colors.surface.main,
                                                            color: active ? '#ffffff' : colors.text.primary,
                                                            borderColor: active ? '#ec4899' : colors.border.main,
                                                            borderWidth: '2px'
                                                        }}
                                                    >
                                                        {p}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Custom variation input */}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={customVariation}
                                                onChange={(e) => setCustomVariation(e.target.value)}
                                                className='flex-1 px-4 py-2 rounded-lg outline-none border-2 transition-all duration-300 text-sm'
                                                style={{
                                                    backgroundColor: colors.surface.main,
                                                    borderColor: colors.border.main,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = colors.border.focus}
                                                onBlur={(e) => e.currentTarget.style.borderColor = colors.border.main}
                                                placeholder={
                                                    products.type?.toLowerCase() === 'clothes' ? 'Add custom size (e.g., 4XL)'
                                                    : products.type?.toLowerCase() === 'shoes' ? 'Add custom shoe size (e.g., 13)'
                                                    : 'Add custom volume (e.g., 150ml)'
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={addCustomVariation}
                                                className='px-4 py-2 rounded-lg font-semibold text-white'
                                                style={{ backgroundColor: '#ec4899' }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Selected variations display */}
                                {(Array.isArray(products.variations) && products.variations.length > 0) && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {products.variations.map((v) => (
                                            <span
                                                key={v}
                                                className='px-3 py-1.5 rounded-full text-sm border'
                                                style={{
                                                    backgroundColor: mode === 'dark' ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.08)',
                                                    color: colors.text.primary,
                                                    borderColor: '#ec4899'
                                                }}
                                            >
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {errors.variations && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <FaExclamationCircle className="text-xs" />
                                        {errors.variations}
                                    </p>
                                )}
                            </div>
                        )}

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
                                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300 resize-none'
                                style={{
                                    backgroundColor: colors.surface.main,
                                    borderColor: errors.description ? '#ef4444' : colors.border.main,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = errors.description ? '#ef4444' : colors.border.focus}
                                onBlur={(e) => e.currentTarget.style.borderColor = errors.description ? '#ef4444' : colors.border.main}
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

                        {/* Update Product Button */}
                        <button
                            onClick={handleUpdateProduct}
                            disabled={isSubmitting}
                            className='w-full font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                            style={{
                                backgroundColor: colors.secondary.main,
                                boxShadow: `0 4px 14px 0 ${colors.secondary.main}40`,
                            }}
                            onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = colors.secondary.hover)}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.secondary.main}>
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Updating Product...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle />
                                    Update Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct