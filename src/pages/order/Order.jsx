import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  const Orders = order.filter(obj => obj.userid === userid);

  return (
    <Layout>
      {loading && <Loader />}
      {Orders.length > 0 ? (
        <div className="pt-10 px-4 md:px-10 mb-20">
          <h1 className="text-center text-3xl font-bold mb-8" style={{ color: mode === 'dark' ? 'white' : '' }}>
            Order History
          </h1>

          {Orders.map((order, index) => (
            <div key={index} className="mb-10 border rounded-lg p-5 shadow-lg" style={{ backgroundColor: mode === 'dark' ? '#1f1f1f' : '#ffffff', color: mode === 'dark' ? 'white' : '' }}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">🧾 Order #{index + 1}</h2>
                <p>🆔 Payment ID: <strong>{order.paymentId}</strong></p>
                <p>📅 Date: {order.date}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold underline mb-2">📦 Shipping Info</h3>
                <p><strong>Name:</strong> {order.addressInfo.name}</p>
                <p><strong>Address:</strong> {order.addressInfo.address}</p>
                <p><strong>Pincode:</strong> {order.addressInfo.pincode}</p>
                <p><strong>Phone:</strong> {order.addressInfo.phoneNumber}</p>
                <p><strong>Email:</strong> {order.email}</p>
              </div>

              <div className="mb-2">
                <h3 className="font-semibold underline mb-2">🛒 Items</h3>
                {order.cartItems.map((item, i) => (
                  <div key={i} className="flex items-center mb-4 border-b pb-2">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded mr-4" />
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p>{item.description}</p>
                      <p className="text-pink-600 font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl text-white">🚫 No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
