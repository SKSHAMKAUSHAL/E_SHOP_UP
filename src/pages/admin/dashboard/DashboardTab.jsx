import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;

  const add = () => {
    window.location.href = '/addproduct';
  };

  return (
    <div className="container mx-auto">
      <Tabs defaultIndex={0}>
        {/* Tab List */}
        <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
          <Tab>
            <button className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]">
              <div className="flex gap-2 items-center">
                <MdOutlineProductionQuantityLimits /> Products
              </div>
            </button>
          </Tab>
          <Tab>
            <button className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
              <div className="flex gap-2 items-center">
                <AiFillShopping /> Orders
              </div>
            </button>
          </Tab>
          <Tab>
            <button className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
              <div className="flex gap-2 items-center">
                <FaUser /> Users
              </div>
            </button>
          </Tab>
        </TabList>

        {/* Products Panel */}
        <TabPanel>
          <div className="px-4 md:px-0 mb-16">
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Product Details
            </h1>
            <div className="flex justify-end">
              <button
                onClick={add}
                className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
              >
                <div className="flex gap-2 items-center">
                  Add Product <FaCartPlus size={20} />
                </div>
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs border border-gray-600 uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <tr>
                    <th className="px-6 py-3">S.No</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                {product.map((item, index) => (
                  <tbody key={`product-${index}`}>
                    <tr className="bg-gray-50 border-b" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4"><img className="w-16" src={item.imageUrl} alt="product" /></td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">₹{item.price}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button onClick={() => deleteProduct(item)}>🗑️</button>
                        <Link to="/updateproduct" onClick={() => edithandle(item)}>✏️</Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </TabPanel>

        {/* Orders Panel */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-16">
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Order Details
            </h1>
            {order.map((allorder, index) => (
              <table key={`order-${index}`} className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <tr>
                    <th className="px-6 py-3">Payment ID</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Pincode</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                {allorder.cartItems.map((item, idx) => (
                  <tbody key={`order-${index}-item-${idx}`}>
                    <tr className="bg-gray-50 border-b" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                      <td className="px-6 py-4">{allorder.paymentId}</td>
                      <td className="px-6 py-4"><img className="w-16" src={item.imageUrl} alt="order" /></td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">₹{item.price}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{allorder.addressInfo.name}</td>
                      <td className="px-6 py-4">{allorder.addressInfo.address}</td>
                      <td className="px-6 py-4">{allorder.addressInfo.pincode}</td>
                      <td className="px-6 py-4">{allorder.addressInfo.phoneNumber}</td>
                      <td className="px-6 py-4">{allorder.email}</td>
                      <td className="px-6 py-4">{allorder.date}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            ))}
          </div>
        </TabPanel>

        {/* Users Panel */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-10">
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
              User Details
            </h1>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">UID</th>
                </tr>
              </thead>
              {user.map((item, index) => (
                <tbody key={`user-${index}`}>
                  <tr className="bg-gray-50 border-b" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.uid}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DashboardTab;
