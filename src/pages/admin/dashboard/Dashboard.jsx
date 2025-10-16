import { useContext, useMemo } from 'react';
import { FaUserTie, FaShoppingBag, FaBoxOpen } from 'react-icons/fa';
import { MdTrendingUp, MdAttachMoney } from 'react-icons/md';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
  const context = useContext(myContext);
  const { mode, product, order, user } = context;

  // Calculate total revenue with useMemo for optimization
  const totalRevenue = useMemo(() => {
    const revenue = order.reduce((total, orderItem) => {
      // Calculate total for each order by summing all cart items
      const orderTotal = orderItem.cartItems.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQuantity = Number(item.quantity) || 1;
        const itemTotal = itemPrice * itemQuantity;
        return sum + itemTotal;
      }, 0);
      return total + orderTotal;
    }, 0);
    
    return revenue;
  }, [order]);

  // Calculate total items sold
  const totalItemsSold = useMemo(() => {
    return order.reduce((total, orderItem) => {
      const orderItemCount = orderItem.cartItems.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 1);
      }, 0);
      return total + orderItemCount;
    }, 0);
  }, [order]);

  const cards = [
    { 
      title: 'Total Products', 
      value: product.length, 
      icon: <FaBoxOpen size={50} />,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-500',
    },
    { 
      title: 'Total Orders', 
      value: order.length, 
      icon: <FaShoppingBag size={50} />,
      color: 'blue',
      bgGradient: 'from-blue-500 to-cyan-500',
    },
    { 
      title: 'Total Users', 
      value: user.length, 
      icon: <FaUserTie size={50} />,
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-500',
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toLocaleString('en-IN')}`, 
      icon: <MdAttachMoney size={50} />,
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-500',
      subtitle: `${totalItemsSold} items sold`
    },
  ];

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        {/* Welcome Header */}
        <div className="container px-5 mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold mb-2 flex items-center justify-center gap-3"
              style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
            >
              <MdTrendingUp className="text-purple-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-500" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
              Manage your e-commerce store efficiently
            </p>
            
            {/* Revenue Breakdown */}
            {order.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl" 
                style={{
                  background: mode === 'dark' 
                    ? 'linear-gradient(135deg, rgb(234 88 12) 0%, rgb(239 68 68) 100%)'
                    : 'linear-gradient(135deg, rgb(254 215 170) 0%, rgb(254 202 202) 100%)',
                  border: mode === 'dark' ? '2px solid rgb(251 146 60)' : '2px solid rgb(251 113 133)'
                }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: mode === 'dark' ? '#fed7aa' : '#9a3412' }}>
                      Total Revenue
                    </p>
                    <p className="text-xl font-bold"
                      style={{ color: mode === 'dark' ? 'white' : '#7c2d12' }}>
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="h-10 w-px"
                  style={{ background: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: mode === 'dark' ? '#fed7aa' : '#9a3412' }}>
                    From Orders
                  </p>
                  <p className="text-xl font-bold"
                    style={{ color: mode === 'dark' ? 'white' : '#7c2d12' }}>
                    {order.length} orders
                  </p>
                </div>
                <div className="h-10 w-px"
                  style={{ background: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: mode === 'dark' ? '#fed7aa' : '#9a3412' }}>
                    Items Sold
                  </p>
                  <p className="text-xl font-bold"
                    style={{ color: mode === 'dark' ? 'white' : '#7c2d12' }}>
                    {totalItemsSold} items
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            {cards.map((card, index) => (
              <div key={index} className="p-4 md:w-1/2 lg:w-1/4 sm:w-1/2 w-full">
                <div
                  className={`
                    relative overflow-hidden
                    border-2 hover:scale-105 transition-all duration-300 
                    shadow-lg hover:shadow-2xl 
                    bg-gradient-to-br ${card.bgGradient}
                    border-transparent px-6 py-8 rounded-2xl
                    cursor-pointer group
                  `}
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(31 41 55)' : '',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '',
                  }}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  
                  {/* Icon with pulse animation */}
                  <div className="text-white w-12 h-12 mb-4 inline-block transform group-hover:scale-110 transition-transform duration-300">
                    <div className="animate-pulse">
                      {card.icon}
                    </div>
                  </div>
                  
                  {/* Value */}
                  <h2 className="title-font font-bold text-4xl text-white mb-2 font-mono">
                    {card.value}
                  </h2>
                  
                  {/* Title */}
                  <p className="text-white font-semibold text-sm uppercase tracking-wider opacity-90">
                    {card.title}
                  </p>

                  {/* Subtitle for additional info */}
                  {card.subtitle && (
                    <p className="text-white text-xs mt-1 opacity-75">
                      {card.subtitle}
                    </p>
                  )}

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
