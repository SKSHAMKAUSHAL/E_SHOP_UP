import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Removed from cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);
    setTotalAmount(total);
  }, [cartItems]);

  const shipping = 100;
  const grandTotal = totalAmount + shipping;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required');
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
      email: JSON.parse(localStorage.getItem('user')).user.email,
      userid: JSON.parse(localStorage.getItem('user')).user.uid,
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
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Something went wrong');
      console.error('Razorpay Error:', err);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 pb-10"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-10">🛒 Cart Items</h1>

        <div className="mx-auto max-w-6xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Left - Cart Items */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border bg-white p-6 shadow-md sm:flex sm:justify-start"
                style={{
                  backgroundColor: mode === 'dark' ? '#202123' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full sm:w-40 rounded-lg"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-sm">{item.description}</p>
                    <p className="mt-1 text-xs font-semibold text-pink-600">₹{item.price}</p>
                  </div>
                  <div
                    onClick={() => deleteCart(item)}
                    className="mt-4 sm:mt-0 sm:block cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.11 48.11 0 00-3.478-.397m-12 .562a48.11 48.11 0 013.478-.397M15.89 15.05L11.86 11.02a1 1 0 00-1.42 0l-4.03 4.03"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Summary & Modal */}
          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === 'dark' ? '#202123' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <div className="mb-2 flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹{grandTotal}</p>
            </div>

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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
