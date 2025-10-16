import { useContext, useState, useMemo } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { 
  FaBox, 
  FaShippingFast, 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaSearch,
  FaChevronDown,
  FaTruck
} from 'react-icons/fa';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  // State management
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const Orders = order.filter(obj => obj.userid === userid);

  // Toggle order expansion
  const toggleOrder = (index) => {
    if (expandedOrders.includes(index)) {
      setExpandedOrders(expandedOrders.filter(i => i !== index));
    } else {
      setExpandedOrders([...expandedOrders, index]);
    }
  };

  // Calculate order total
  const calculateOrderTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...Orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.addressInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'amount') {
      filtered.sort((a, b) => calculateOrderTotal(b.cartItems) - calculateOrderTotal(a.cartItems));
    }

    return filtered;
  }, [Orders, searchTerm, sortBy]);

  // Order status (you can enhance this based on your actual status logic)
  const getOrderStatus = (order) => {
    // This is a placeholder - customize based on your business logic
    return order.status || 'Processing';
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-purple-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return <FaCheckCircle />;
      case 'shipped': return <FaTruck />;
      case 'processing': return <FaBox />;
      default: return <FaShippingFast />;
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      
      <div className="min-h-screen py-10 px-4 md:px-10 mb-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FaBox className="text-4xl text-pink-600" />
              <h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              >
                My Orders
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
              <div className="h-1 w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <div className="h-1 w-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
            </div>
            <p className="text-gray-500 mt-2" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
              Track and manage your orders
            </p>
          </div>

          {Orders.length > 0 ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
                <div 
                  className="p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-gradient-to-br from-pink-500 to-pink-600">
                      <FaBox className="text-2xl text-white" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Total Orders</p>
                      <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                        {Orders.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                      <FaCreditCard className="text-2xl text-white" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Total Spent</p>
                      <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                        ₹{Orders.reduce((total, order) => total + calculateOrderTotal(order.cartItems), 0).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                      <FaShippingFast className="text-2xl text-white" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Items Ordered</p>
                      <p className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                        {Orders.reduce((total, order) => total + order.cartItems.length, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="mb-6 flex flex-col md:flex-row gap-4 animate-fade-in">
                {/* Search */}
                <div className="flex-1 relative">
                  <FaSearch 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                    style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
                  />
                  <input
                    type="text"
                    placeholder="Search by Order ID or Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 focus:outline-none focus:border-pink-500"
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                      color: mode === 'dark' ? 'white' : '#1f2937',
                      borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                    }}
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 font-medium cursor-pointer transition-all duration-300 hover:border-pink-500 focus:outline-none focus:border-pink-500"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                    color: mode === 'dark' ? 'white' : '#1f2937',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                  }}
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="amount">💰 Highest Amount</option>
                </select>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => {
                    const isExpanded = expandedOrders.includes(index);
                    const orderStatus = getOrderStatus(order);
                    const orderTotal = calculateOrderTotal(order.cartItems);

                    return (
                      <div 
                        key={index} 
                        className="border-2 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in"
                        style={{ 
                          backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                          borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {/* Order Header - Always Visible */}
                        <div 
                          className="p-6 cursor-pointer hover:bg-opacity-50 transition-all duration-300"
                          onClick={() => toggleOrder(index)}
                          style={{
                            background: mode === 'dark' 
                              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                              : 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
                          }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Order Info */}
                            <div className="flex items-center gap-4">
                              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                                <FaBox className="text-2xl text-white" />
                              </div>
                              <div>
                                <h2 className="text-xl font-bold mb-1" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                  Order #{index + 1}
                                </h2>
                                <div className="flex items-center gap-2 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                  <FaCalendarAlt />
                                  <span>{order.date}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status and Amount */}
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm mb-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                  Order Total
                                </p>
                                <p className="text-2xl font-bold text-pink-600">
                                  ₹{orderTotal.toLocaleString('en-IN')}
                                </p>
                              </div>

                              <div className={`px-4 py-2 rounded-full ${getStatusColor(orderStatus)} text-white font-bold flex items-center gap-2`}>
                                {getStatusIcon(orderStatus)}
                                {orderStatus}
                              </div>

                              {/* Expand Icon */}
                              <div className="p-2 rounded-full transition-transform duration-300"
                                style={{ 
                                  backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb',
                                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                              >
                                <FaChevronDown style={{ color: mode === 'dark' ? 'white' : '#1f2937' }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Order Details */}
                        <div 
                          className={`transition-all duration-500 overflow-hidden ${
                            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-6 border-t-2" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                            {/* Payment ID */}
                            <div className="mb-6 p-4 rounded-xl border-2 border-dashed"
                              style={{ 
                                backgroundColor: mode === 'dark' ? 'rgb(31 41 55)' : '#f9fafb',
                                borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#d1d5db'
                              }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <FaCreditCard className="text-pink-600" />
                                <span className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                  Payment ID
                                </span>
                              </div>
                              <p className="text-lg font-mono" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                {order.paymentId}
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              {/* Shipping Info */}
                              <div className="p-5 rounded-xl border-2"
                                style={{ 
                                  backgroundColor: mode === 'dark' ? 'rgb(31 41 55)' : '#f9fafb',
                                  borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                                }}
                              >
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"
                                  style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                                >
                                  <FaShippingFast className="text-pink-600" />
                                  Shipping Details
                                </h3>
                                <div className="space-y-3">
                                  <div className="flex items-start gap-2">
                                    <FaUser className="mt-1 text-pink-600" />
                                    <div>
                                      <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Name</p>
                                      <p className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                        {order.addressInfo.name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <FaMapMarkerAlt className="mt-1 text-pink-600" />
                                    <div>
                                      <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Address</p>
                                      <p className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                        {order.addressInfo.address}, {order.addressInfo.pincode}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <FaPhone className="mt-1 text-pink-600" />
                                    <div>
                                      <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Phone</p>
                                      <p className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                        {order.addressInfo.phoneNumber}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <FaEnvelope className="mt-1 text-pink-600" />
                                    <div>
                                      <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Email</p>
                                      <p className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                        {order.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div className="p-5 rounded-xl border-2"
                                style={{ 
                                  backgroundColor: mode === 'dark' ? 'rgb(31 41 55)' : '#f9fafb',
                                  borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                                }}
                              >
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"
                                  style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                                >
                                  <FaCreditCard className="text-pink-600" />
                                  Order Summary
                                </h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Items ({order.cartItems.length})</span>
                                    <span className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                      ₹{orderTotal.toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                  </div>
                                  <div className="pt-3 border-t-2" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}>
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold text-lg" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>Total</span>
                                      <span className="font-bold text-2xl text-pink-600">
                                        ₹{orderTotal.toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Items List */}
                            <div>
                              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"
                                style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                              >
                                <FaBox className="text-pink-600" />
                                Order Items ({order.cartItems.length})
                              </h3>
                              <div className="space-y-4">
                                {order.cartItems.map((item, i) => (
                                  <div 
                                    key={i} 
                                    className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                    style={{ 
                                      backgroundColor: mode === 'dark' ? 'rgb(31 41 55)' : 'white',
                                      borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb'
                                    }}
                                  >
                                    <img 
                                      src={item.imageUrl} 
                                      alt={item.title} 
                                      className="w-24 h-24 object-cover rounded-lg border-2"
                                      style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '#e5e7eb' }}
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg mb-1" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                                        {item.title}
                                      </h4>
                                      <p className="text-sm mb-2 line-clamp-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                        {item.description}
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <p className="text-xl font-bold text-pink-600">
                                          ₹{Number(item.price).toLocaleString('en-IN')}
                                        </p>
                                        {item.quantity > 1 && (
                                          <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold"
                                            style={{
                                              backgroundColor: mode === 'dark' ? 'rgba(236, 72, 153, 0.2)' : '',
                                              color: mode === 'dark' ? '#ec4899' : ''
                                            }}
                                          >
                                            Qty: {item.quantity}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20">
                    <div className="flex flex-col items-center gap-4">
                      <FaSearch className="text-6xl" style={{ color: mode === 'dark' ? '#9ca3af' : '#d1d5db' }} />
                      <h2 className="text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                        No Orders Found
                      </h2>
                      <p className="text-gray-500">Try adjusting your search terms</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="flex flex-col items-center gap-6">
                <div className="p-8 rounded-full bg-gradient-to-br from-pink-100 to-purple-100"
                  style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}
                >
                  <FaBox className="text-7xl text-pink-600" />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}>
                  No Orders Yet
                </h2>
                <p className="text-lg" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Start shopping to see your orders here!
                </p>
                <button
                  onClick={() => window.location.href = '/allproducts'}
                  className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                  }}
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Order;
