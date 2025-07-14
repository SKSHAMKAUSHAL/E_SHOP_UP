// DashboardTab Component with Original CSS Preserved
import React, { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MyContext from "../../../context/data/useContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function DashboardTab() {
  const context = useContext(MyContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;
  const isDark = mode === 'dark';

  return (
    <div className="container mx-auto">
      <Tabs>
        <TabList className="grid grid-cols-2 md:flex md:space-x-8 justify-center gap-4 mb-10">
          <Tab>
            <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12]">
              <div className="flex gap-2 items-center">
                <MdOutlineProductionQuantityLimits />Products
              </div>
            </button>
          </Tab>
          <Tab>
            <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
              <div className="flex gap-2 items-center">
                <AiFillShopping /> Order
              </div>
            </button>
          </Tab>
          <Tab>
            <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
              <div className="flex gap-2 items-center">
                <FaUser /> Users
              </div>
            </button>
          </Tab>
        </TabList>

        <TabPanel>
          <div className='px-4 md:px-0 mb-16'>
            <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: isDark ? 'white' : '' }}>Product Details</h1>
            <div className="flex justify-end">
              <button
                onClick={() => (window.location.href = '/addproduct')}
                type="button"
                className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}
              >
                <div className="flex gap-2 items-center">
                  Add Product <FaCartPlus size={20} />
                </div>
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
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
                <tbody>
                  {product.map((item, index) => (
                    <tr key={index} className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
                      <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{index + 1}.</td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <img className='w-16' src={item.imageUrl} alt="img" />
                      </td>
                      <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.title}</td>
                      <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>₹{item.price}</td>
                      <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.category}</td>
                      <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2" style={{ color: isDark ? 'white' : '' }}>
                          <div onClick={() => deleteProduct(item)}>
                            <AiFillDelete className="w-6 h-6" />
                          </div>
                          <Link to={'/updateproduct'}>
                            <div onClick={() => edithandle(item)}>
                              <AiFillPlusCircle className="w-6 h-6" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        {/* ORDER TAB */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-16">
            <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: isDark ? 'white' : '' }}>Order Details</h1>
            {order.length === 0 ? (
              <p className="text-center text-lg" style={{ color: isDark ? 'white' : '' }}>No orders available.</p>
            ) : (
              order.map((allorder, index) => (
                <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6">
                  <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
                    <tr>
                      <th className="px-6 py-3">Payment Id</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Address</th>
                      <th className="px-6 py-3">Pincode</th>
                      <th className="px-6 py-3">Phone Number</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allorder.cartItems.map((item, i) => (
                      <tr key={i} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.paymentId}</td>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          <img className='w-16' src={item.imageUrl} alt="img" />
                        </td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.title}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>₹{item.price}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.category}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.addressInfo.name}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.addressInfo.address}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.addressInfo.pincode}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.addressInfo.phoneNumber}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.email}</td>
                        <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{allorder.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))
            )}
          </div>
        </TabPanel>

        {/* USER TAB */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-10">
            <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: isDark ? 'white' : '' }}>User Details</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Uid</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr key={index} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: isDark ? 'rgb(46 49 55)' : '', color: isDark ? 'white' : '' }}>
                    <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{index + 1}.</td>
                    <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.name}</td>
                    <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.email}</td>
                    <td className="px-6 py-4" style={{ color: isDark ? 'white' : '' }}>{item.uid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default DashboardTab;
