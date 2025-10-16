import { useContext, useState, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus, FaSearch } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function DashboardTab() {
    const context = useContext(myContext);
    const { mode, product, edithandle, deleteProduct, order, user } = context;
    const navigate = useNavigate();

    // Search and filter states
    const [productSearch, setProductSearch] = useState("");
    const [orderSearch, setOrderSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Filtered data using useMemo for optimization
    const filteredProducts = useMemo(() => {
        return product.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                                item.category.toLowerCase().includes(productSearch.toLowerCase());
            const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [product, productSearch, categoryFilter]);

    const filteredOrders = useMemo(() => {
        return order.filter(item => {
            return item.paymentId?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                   item.addressInfo?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                   item.email?.toLowerCase().includes(orderSearch.toLowerCase());
        });
    }, [order, orderSearch]);

    const filteredUsers = useMemo(() => {
        return user.filter(item => {
            return item.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
                   item.email?.toLowerCase().includes(userSearch.toLowerCase());
        });
    }, [user, userSearch]);

    // Get unique categories
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(product.map(item => item.category))];
        return uniqueCategories;
    }, [product]);

    const add = () => {
        navigate('/addproduct');
    }
    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0} className="">
                        <TabList className="md:flex md:space-x-4 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
                            <Tab>
                                <button 
                                    type="button" 
                                    className="font-medium border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl text-lg shadow-lg px-6 py-3 text-center w-full"
                                    style={{
                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'linear-gradient(to right, rgb(250 245 255), rgb(252 231 243))',
                                        borderColor: mode === 'dark' ? '#a855f7' : 'rgb(168 85 247)',
                                        color: mode === 'dark' ? '#c084fc' : 'rgb(168 85 247)',
                                    }}
                                >
                                    <div className="flex gap-2 items-center justify-center">
                                        <MdOutlineProductionQuantityLimits size={24} />
                                        <span className="font-bold">Products</span>
                                        <span className="ml-1 text-xs text-white px-2 py-1 rounded-full"
                                            style={{ backgroundColor: mode === 'dark' ? '#a855f7' : 'rgb(168 85 247)' }}>
                                            {product.length}
                                        </span>
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button 
                                    type="button" 
                                    className="font-medium border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl text-lg shadow-lg px-6 py-3 text-center w-full"
                                    style={{
                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'linear-gradient(to right, rgb(252 231 243), rgb(255 228 230))',
                                        borderColor: mode === 'dark' ? '#ec4899' : 'rgb(236 72 153)',
                                        color: mode === 'dark' ? '#f9a8d4' : 'rgb(236 72 153)',
                                    }}
                                >
                                    <div className="flex gap-2 items-center justify-center">
                                        <AiFillShopping size={24} />
                                        <span className="font-bold">Orders</span>
                                        <span className="ml-1 text-xs text-white px-2 py-1 rounded-full"
                                            style={{ backgroundColor: mode === 'dark' ? '#ec4899' : 'rgb(236 72 153)' }}>
                                            {order.length}
                                        </span>
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button 
                                    type="button" 
                                    className="font-medium border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl text-lg shadow-lg px-6 py-3 text-center w-full"
                                    style={{
                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'linear-gradient(to right, rgb(220 252 231), rgb(209 250 229))',
                                        borderColor: mode === 'dark' ? '#22c55e' : 'rgb(34 197 94)',
                                        color: mode === 'dark' ? '#86efac' : 'rgb(34 197 94)',
                                    }}
                                >
                                    <div className="flex gap-2 items-center justify-center">
                                        <FaUser size={24} />
                                        <span className="font-bold">Users</span>
                                        <span className="ml-1 text-xs text-white px-2 py-1 rounded-full"
                                            style={{ backgroundColor: mode === 'dark' ? '#22c55e' : 'rgb(34 197 94)' }}>
                                            {user.length}
                                        </span>
                                    </div>
                                </button>
                            </Tab>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-6 text-3xl font-bold' style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    Product Management
                                </h1>
                                
                                {/* Search and Filter Bar */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6">
                                    <div className="flex-1 relative">
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search products by name or category..."
                                            value={productSearch}
                                            onChange={(e) => setProductSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 outline-none transition-all"
                                            style={{
                                                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                color: mode === 'dark' ? 'white' : '',
                                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '',
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 outline-none transition-all"
                                            style={{
                                                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                color: mode === 'dark' ? 'white' : '',
                                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '',
                                            }}
                                        >
                                            <option value="all">All Categories</option>
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        
                                        <button
                                            onClick={add}
                                            type="button"
                                            className="focus:outline-none text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold rounded-lg text-sm px-6 py-3 flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <FaCartPlus size={20} />
                                            Add Product
                                        </button>
                                    </div>
                                </div>

                                {/* Results count */}
                                <div className="mb-4 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Showing {filteredProducts.length} of {product.length} products
                                </div>
                                <div className="shadow-2xl rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-purple-500/20" 
                                    style={{ 
                                        borderColor: mode === 'dark' ? 'rgb(147 51 234)' : 'rgb(216 180 254)',
                                        background: mode === 'dark' ? 'rgb(31 41 55)' : 'white'
                                    }}>
                                    <table className="w-full text-sm text-left">
                                        <thead className="uppercase border-b-2 relative overflow-hidden"
                                            style={{ 
                                                background: mode === 'dark' 
                                                    ? 'linear-gradient(135deg, rgb(88 28 135) 0%, rgb(147 51 234) 100%)'
                                                    : 'linear-gradient(135deg, rgb(243 232 255) 0%, rgb(251 207 232) 100%)',
                                                borderColor: mode === 'dark' ? 'rgb(192 132 252)' : 'rgb(168 85 247)',
                                            }}>
                                            <tr>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>🔢 S.No</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>📷 Image</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>📦 Title</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>💰 Price</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>🏷️ Category</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>📅 Date</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#fae8ff' : '#581c87' }}>⚡ Action</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-12 text-center" 
                                                        style={{ 
                                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                            color: mode === 'dark' ? '#9ca3af' : '#9ca3af'
                                                        }}>
                                                        <div className="flex flex-col items-center gap-3">
                                                            <MdOutlineProductionQuantityLimits 
                                                                size={60} 
                                                                style={{ color: mode === 'dark' ? '#6b7280' : '#d1d5db' }}
                                                            />
                                                            <p className="text-lg font-semibold" 
                                                                style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                No products found
                                                            </p>
                                                            <p className="text-sm" 
                                                                style={{ color: mode === 'dark' ? '#6b7280' : '#9ca3af' }}>
                                                                Try adjusting your search or filter
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredProducts.map((item, index) => {
                                                    const { title, price, imageUrl, category, date } = item;
                                                    return (
                                                        <tr key={item.id || index} className="border-b transition-all duration-300 group" 
                                                            style={{ 
                                                                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                                color: mode === 'dark' ? 'white' : '',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(88 28 135)' : 'rgb(250 245 255)';
                                                                e.currentTarget.style.transform = 'scale(1.01)';
                                                                e.currentTarget.style.boxShadow = mode === 'dark' 
                                                                    ? '0 4px 20px rgba(168, 85, 247, 0.3)' 
                                                                    : '0 4px 20px rgba(168, 85, 247, 0.2)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(46 49 55)' : 'white';
                                                                e.currentTarget.style.transform = 'scale(1)';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            <td className="px-6 py-4 font-medium" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                {index + 1}.
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img className='w-20 h-20 object-cover rounded-lg shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-400' src={imageUrl} alt={title} />
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                {title}
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-green-600">
                                                                ₹{price}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-3 py-1 rounded-full text-xs font-semibold"
                                                                    style={{
                                                                        backgroundColor: mode === 'dark' ? 'rgb(88 28 135)' : 'rgb(243 232 255)',
                                                                        color: mode === 'dark' ? 'rgb(233 213 255)' : 'rgb(107 33 168)'
                                                                    }}>
                                                                    {category}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                {date}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex gap-3">
                                                                    <button
                                                                        onClick={() => deleteProduct(item)}
                                                                        className="p-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transform active:scale-95"
                                                                        title="Delete Product"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                    </button>

                                                                    <Link to={'/updateproduct'}>
                                                                        <button
                                                                            onClick={() => edithandle(item)}
                                                                            className="p-2 bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transform active:scale-95"
                                                                            title="Edit Product"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className='text-center mb-6 text-3xl font-bold' style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    Order Management
                                </h1>

                                {/* Search Bar for Orders */}
                                <div className="mb-6 relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search orders by payment ID, name, or email..."
                                        value={orderSearch}
                                        onChange={(e) => setOrderSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 outline-none transition-all"
                                        style={{
                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                            color: mode === 'dark' ? 'white' : '',
                                            borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '',
                                        }}
                                    />
                                </div>

                                {/* Results count */}
                                <div className="mb-4 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Showing {filteredOrders.length} of {order.length} orders
                                </div>

                                {filteredOrders.length === 0 ? (
                                    <div className="flex flex-col items-center gap-3 py-12 rounded-xl"
                                        style={{ 
                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'rgb(255 241 242)',
                                            padding: '3rem'
                                        }}>
                                        <AiFillShopping size={60} 
                                            style={{ color: mode === 'dark' ? '#6b7280' : '#d1d5db' }}
                                        />
                                        <p className="text-lg font-semibold" 
                                            style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                            No orders found
                                        </p>
                                        <p className="text-sm" 
                                            style={{ color: mode === 'dark' ? '#6b7280' : '#9ca3af' }}>
                                            Try adjusting your search
                                        </p>
                                    </div>
                                ) : (
                                    filteredOrders.map((allorder, orderIndex) => (
                                        <div key={allorder.id || orderIndex} className="mb-8 shadow-2xl rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-pink-500/20 animate-fade-in"
                                            style={{ 
                                                borderColor: mode === 'dark' ? 'rgb(236 72 153)' : 'rgb(251 207 232)',
                                                background: mode === 'dark' ? 'rgb(31 41 55)' : 'white'
                                            }}>
                                            {/* Order Badge */}
                                            <div className="px-6 py-3 border-b-2 flex items-center justify-between"
                                                style={{
                                                    background: mode === 'dark' 
                                                        ? 'linear-gradient(135deg, rgb(157 23 77) 0%, rgb(190 24 93) 100%)'
                                                        : 'linear-gradient(135deg, rgb(252 231 243) 0%, rgb(255 228 230) 100%)',
                                                    borderColor: mode === 'dark' ? 'rgb(236 72 153)' : 'rgb(236 72 153)'
                                                }}>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">📦</span>
                                                    <div>
                                                        <h3 className="font-bold text-sm" style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>
                                                            Order #{orderIndex + 1}
                                                        </h3>
                                                        <p className="text-xs" style={{ color: mode === 'dark' ? '#fbcfe8' : '#9f1239' }}>
                                                            {allorder.cartItems.length} item(s)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 rounded-full text-xs font-bold"
                                                    style={{
                                                        background: mode === 'dark' ? 'rgb(190 24 93)' : 'rgb(236 72 153)',
                                                        color: 'white'
                                                    }}>
                                                    {allorder.date}
                                                </div>
                                            </div>
                                            
                                            <table className="w-full text-sm text-left">
                                                <thead className="uppercase border-b-2 relative overflow-hidden"
                                                    style={{ 
                                                        background: mode === 'dark' 
                                                            ? 'linear-gradient(135deg, rgb(131 24 67) 0%, rgb(190 24 93) 100%)'
                                                            : 'linear-gradient(135deg, rgb(252 231 243) 0%, rgb(255 228 230) 100%)',
                                                        borderColor: mode === 'dark' ? 'rgb(244 114 182)' : 'rgb(236 72 153)'
                                                    }}>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>💳 Payment ID</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📷 Image</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📦 Title</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>💰 Price</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>🏷️ Category</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>👤 Name</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>🏠 Address</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📍 Pincode</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📞 Phone</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📧 Email</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 font-bold text-xs tracking-wide relative group">
                                                            <span style={{ color: mode === 'dark' ? '#fce7f3' : '#831843' }}>📅 Date</span>
                                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allorder.cartItems.map((item, itemIndex) => {
                                                        const { title, category, imageUrl, price } = item;
                                                        return (
                                                            <tr key={`${allorder.id}-${itemIndex}`} className="border-b transition-all duration-300" 
                                                                style={{ 
                                                                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                                    color: mode === 'dark' ? 'white' : '',
                                                                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : ''
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(131 24 67)' : 'rgb(252 231 243)';
                                                                    e.currentTarget.style.transform = 'scale(1.01)';
                                                                    e.currentTarget.style.boxShadow = mode === 'dark' 
                                                                        ? '0 4px 20px rgba(236, 72, 153, 0.3)' 
                                                                        : '0 4px 20px rgba(236, 72, 153, 0.2)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(46 49 55)' : 'white';
                                                                    e.currentTarget.style.transform = 'scale(1)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <td className="px-6 py-4 font-mono text-xs" style={{ color: mode === 'dark' ? '#c084fc' : '#8b5cf6' }}>
                                                                    {allorder.paymentId}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <img className='w-16 h-16 object-cover rounded-lg shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-400' src={imageUrl} alt={title} />
                                                                </td>
                                                                <td className="px-6 py-4 font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                    {title}
                                                                </td>
                                                                <td className="px-6 py-4 font-bold text-green-600">
                                                                    ₹{price}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                                                                        style={{
                                                                            backgroundColor: mode === 'dark' ? 'rgb(157 23 77)' : 'rgb(252 231 243)',
                                                                            color: mode === 'dark' ? 'rgb(251 207 232)' : 'rgb(190 24 93)'
                                                                        }}>
                                                                        {category}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                    {allorder.addressInfo.name}
                                                                </td>
                                                                <td className="px-6 py-4 text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    {allorder.addressInfo.address}
                                                                </td>
                                                                <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                    {allorder.addressInfo.pincode}
                                                                </td>
                                                                <td className="px-6 py-4 font-mono text-xs" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                    {allorder.addressInfo.phoneNumber}
                                                                </td>
                                                                <td className="px-6 py-4 text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    {allorder.email}
                                                                </td>
                                                                <td className="px-6 py-4 text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    {allorder.date}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                )}
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className='text-center mb-6 text-3xl font-bold' style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                    User Management
                                </h1>

                                {/* Search Bar for Users */}
                                <div className="mb-6 relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users by name or email..."
                                        value={userSearch}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 outline-none transition-all"
                                        style={{
                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                            color: mode === 'dark' ? 'white' : '',
                                            borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '',
                                        }}
                                    />
                                </div>

                                {/* Results count */}
                                <div className="mb-4 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                    Showing {filteredUsers.length} of {user.length} users
                                </div>

                                <div className="shadow-2xl rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-green-500/20"
                                    style={{ 
                                        borderColor: mode === 'dark' ? 'rgb(34 197 94)' : 'rgb(187 247 208)',
                                        background: mode === 'dark' ? 'rgb(31 41 55)' : 'white'
                                    }}>
                                    <table className="w-full text-sm text-left">
                                        <thead className="uppercase border-b-2 relative overflow-hidden"
                                            style={{ 
                                                background: mode === 'dark' 
                                                    ? 'linear-gradient(135deg, rgb(21 128 61) 0%, rgb(34 197 94) 100%)'
                                                    : 'linear-gradient(135deg, rgb(220 252 231) 0%, rgb(209 250 229) 100%)',
                                                borderColor: mode === 'dark' ? 'rgb(134 239 172)' : 'rgb(34 197 94)'
                                            }}>
                                            <tr>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#dcfce7' : '#14532d' }}>🔢 S.No</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#dcfce7' : '#14532d' }}>👤 Name</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#dcfce7' : '#14532d' }}>📧 Email</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                                <th scope="col" className="px-6 py-5 font-bold text-sm tracking-wide relative group">
                                                    <span style={{ color: mode === 'dark' ? '#dcfce7' : '#14532d' }}>🆔 User ID</span>
                                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 group-hover:w-full transition-all duration-300"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-12 text-center"
                                                        style={{ 
                                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                            color: mode === 'dark' ? '#9ca3af' : '#9ca3af'
                                                        }}>
                                                        <div className="flex flex-col items-center gap-3">
                                                            <FaUser size={60} 
                                                                style={{ color: mode === 'dark' ? '#6b7280' : '#d1d5db' }}
                                                            />
                                                            <p className="text-lg font-semibold"
                                                                style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                No users found
                                                            </p>
                                                            <p className="text-sm"
                                                                style={{ color: mode === 'dark' ? '#6b7280' : '#9ca3af' }}>
                                                                Try adjusting your search
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((item, index) => {
                                                    const { name, uid, email } = item;
                                                    return (
                                                        <tr key={uid || index} className="border-b transition-all duration-300" 
                                                            style={{ 
                                                                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                                                color: mode === 'dark' ? 'white' : '',
                                                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : ''
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(21 128 61)' : 'rgb(220 252 231)';
                                                                e.currentTarget.style.transform = 'scale(1.01)';
                                                                e.currentTarget.style.boxShadow = mode === 'dark' 
                                                                    ? '0 4px 20px rgba(34, 197, 94, 0.3)' 
                                                                    : '0 4px 20px rgba(34, 197, 94, 0.2)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = mode === 'dark' ? 'rgb(46 49 55)' : 'white';
                                                                e.currentTarget.style.transform = 'scale(1)';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            <td className="px-6 py-4 font-medium" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                {index + 1}.
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                                                {name}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                {email}
                                                            </td>
                                                            <td className="px-6 py-4 font-mono text-xs" style={{ color: mode === 'dark' ? '#c084fc' : '#8b5cf6' }}>
                                                                {uid}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab
