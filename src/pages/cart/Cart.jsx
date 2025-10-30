import { useContext, useEffect, useState, useMemo } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, incrementQuantity, decrementQuantity, clearCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your cart', {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/login');
    }
  }, [user, navigate]);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Removed from cart', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Memoized calculations for better performance
  const { totalAmount, totalItems } = useMemo(() => {
    const items = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const amount = cartItems.reduce((acc, item) => acc + (parseInt(item.price) * (item.quantity || 1)), 0);
    return { totalAmount: amount, totalItems: items };
  }, [cartItems]);

  const shipping = totalAmount > 500 ? 0 : 100;
  const discount = totalAmount > 1000 ? Math.floor(totalAmount * 0.1) : 0;
  const grandTotal = totalAmount + shipping - discount;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const buyNow = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please login to place an order', { position: "top-center" });
      navigate('/login');
      return;
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      toast.error('Your cart is empty', { position: "top-center" });
      return;
    }

    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required', { position: "top-center" });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      date: addressInfo.date,
      email: user.user.email,
      userid: user.user.uid,
    };

    try {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'SHOP UP',
        description: 'Test Transaction',
        handler: async function (response) {
          toast.success('Payment Successful');

          const paymentId = response.razorpay_payment_id;
          await addDoc(collection(fireDB, 'orders'), { ...orderInfo, paymentId });
          dispatch(clearCart());
        },
        theme: {
          color: '#ec4899',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  // Don't render anything if user is not logged in (redirect will happen)
  if (!user) {
    return null;
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div
          className="min-h-screen flex flex-col items-center justify-center"
          style={{
            backgroundColor: mode === 'dark' ? '#282c34' : '#f9fafb',
            color: mode === 'dark' ? 'white' : '',
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link to="/allproducts">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-50 pt-8 pb-10"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  dispatch(clearCart());
                  toast.info('Cart cleared');
                }
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors self-start sm:self-auto"
            >
              Clear Cart
            </button>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 gap-y-6">
            {/* Left - Cart Items */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    style={{
                      backgroundColor: mode === 'dark' ? '#202123' : '',
                      color: mode === 'dark' ? 'white' : '',
                      borderColor: mode === 'dark' ? '#374151' : '',
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between gap-2">
                            <h2 className="text-base sm:text-lg font-semibold mb-2 pr-2">{item.title}</h2>
                            <button
                              onClick={() => deleteCart(item)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex items-center space-x-4 w-full sm:w-auto">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg" style={{ borderColor: mode === 'dark' ? '#374151' : '#e5e7eb' }}>
                              <button
                                onClick={() => handleDecrement(item)}
                                className="px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg touch-manipulation"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                              </button>
                              <span className="px-3 sm:px-4 py-2 font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => handleIncrement(item)}
                                className="px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg touch-manipulation"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right sm:text-right w-full sm:w-auto">
                            <p className="text-lg sm:text-xl font-bold text-pink-600">
                              ₹{parseInt(item.price) * (item.quantity || 1)}
                            </p>
                            <p className="text-xs text-gray-500">₹{item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link to="/allproducts">
                <button className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Continue Shopping
                </button>
              </Link>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4 mt-6 lg:mt-0">
              <div
                className="rounded-xl border bg-white p-4 sm:p-6 shadow-sm lg:sticky lg:top-24"
                style={{
                  backgroundColor: mode === 'dark' ? '#202123' : '',
                  color: mode === 'dark' ? 'white' : '',
                  borderColor: mode === 'dark' ? '#374151' : '',
                }}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium">₹{totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                        Discount (10%)
                      </span>
                      <span className="font-medium text-green-600">-₹{discount}</span>
                    </div>
                  )}

                  {totalAmount < 500 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Add ₹{500 - totalAmount} more to get FREE shipping! 🚚
                      </p>
                    </div>
                  )}

                  {totalAmount >= 500 && totalAmount < 1000 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Add ₹{1000 - totalAmount} more to get 10% discount! 🎉
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6" style={{ borderColor: mode === 'dark' ? '#374151' : '' }}>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Only show Buy Now button when cart has items */}
                {cartItems.length > 0 && (
                  <Modal
                    name={name}
                    address={address}
                    pincode={pincode}
                    phoneNumber={phoneNumber}
                    setName={setName}
                    setAddress={setAddress}
                    setPincode={setPincode}
                    setPhoneNumber={setPhoneNumber}
                    buyNow={buyNow}
                  />
                )}

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
