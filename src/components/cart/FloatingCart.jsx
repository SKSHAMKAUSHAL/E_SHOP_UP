import { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import { RxCross2 } from 'react-icons/rx';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { getThemeColors } from '../../utils/colorUtils';

function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode } = context;
  const colors = getThemeColors(mode);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return total + (price * quantity);
  }, 0);

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  const handleDelete = (item) => {
    dispatch(deleteFromCart(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  return (
    <>
      {/* Floating Cart Button - Fixed position at bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center group"
        style={{
          backgroundColor: colors.primary.main,
          color: 'white',
        }}
        aria-label="Open cart"
      >
        <FaShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span
            className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold animate-pulse"
            style={{
              backgroundColor: colors.semantic.error,
              color: 'white',
            }}
          >
            {cartItems.length}
          </span>
        )}
        
        {/* Tooltip */}
        <span 
          className="absolute right-full mr-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: colors.surface.main,
            color: colors.text.primary,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          View Cart ({cartItems.length})
        </span>
      </button>

      {/* Slide-out Drawer */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={setIsOpen}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div 
                      className="flex h-full flex-col overflow-y-auto shadow-xl"
                      style={{ backgroundColor: colors.background.primary }}
                    >
                      {/* Header */}
                      <div 
                        className="flex items-center justify-between px-4 py-6"
                        style={{ 
                          backgroundColor: colors.surface.main,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}
                      >
                        <Dialog.Title 
                          className="text-lg font-bold flex items-center gap-2"
                          style={{ color: colors.text.primary }}
                        >
                          <FaShoppingCart className="w-5 h-5" style={{ color: colors.primary.main }} />
                          Shopping Cart ({cartItems.length})
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md p-2 transition-colors duration-200"
                          style={{ 
                            color: colors.text.secondary,
                            backgroundColor: 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.surface.hover;
                            e.currentTarget.style.color = colors.text.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.text.secondary;
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          <RxCross2 className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Cart Items */}
                      <div className="flex-1 overflow-y-auto px-4 py-6">
                        {cartItems.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full py-12">
                            <FaShoppingCart 
                              className="w-20 h-20 mb-4 opacity-30"
                              style={{ color: colors.text.secondary }}
                            />
                            <p 
                              className="text-lg font-medium mb-2"
                              style={{ color: colors.text.primary }}
                            >
                              Your cart is empty
                            </p>
                            <p 
                              className="text-sm mb-6"
                              style={{ color: colors.text.secondary }}
                            >
                              Add items to get started!
                            </p>
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                navigate('/allproducts');
                              }}
                              className="px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                              style={{
                                backgroundColor: colors.primary.main,
                                color: 'white',
                              }}
                            >
                              Browse Products
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {cartItems.map((item, index) => (
                              <div
                                key={`${item.id}-${index}`}
                                className="flex gap-4 p-4 rounded-lg transition-all duration-200"
                                style={{ 
                                  backgroundColor: colors.surface.main,
                                  border: `1px solid ${colors.border.main}`,
                                }}
                              >
                                {/* Product Image */}
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex flex-1 flex-col">
                                  <div className="flex justify-between">
                                    <div className="flex-1 pr-2">
                                      <h3 
                                        className="text-sm font-semibold line-clamp-2"
                                        style={{ color: colors.text.primary }}
                                      >
                                        {item.title}
                                      </h3>
                                      <p 
                                        className="mt-1 text-sm"
                                        style={{ color: colors.text.secondary }}
                                      >
                                        {item.category}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => handleDelete(item)}
                                      className="p-1 rounded transition-colors duration-200"
                                      style={{ color: colors.semantic.error }}
                                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between mt-2">
                                    {/* Quantity Controls */}
                                    <div 
                                      className="flex items-center gap-2 px-2 py-1 rounded-md"
                                      style={{ backgroundColor: colors.background.primary }}
                                    >
                                      <button
                                        onClick={() => handleDecrement(item)}
                                        disabled={item.quantity <= 1}
                                        className="p-1 rounded transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                                        style={{ color: colors.primary.main }}
                                        onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = colors.surface.hover)}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <FaMinus className="w-3 h-3" />
                                      </button>
                                      <span 
                                        className="px-2 font-medium text-sm min-w-[2rem] text-center"
                                        style={{ color: colors.text.primary }}
                                      >
                                        {item.quantity || 1}
                                      </span>
                                      <button
                                        onClick={() => handleIncrement(item)}
                                        className="p-1 rounded transition-all duration-200"
                                        style={{ color: colors.primary.main }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surface.hover}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <FaPlus className="w-3 h-3" />
                                      </button>
                                    </div>

                                    {/* Price */}
                                    <p 
                                      className="text-base font-bold"
                                      style={{ color: colors.primary.main }}
                                    >
                                      ₹{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer - Subtotal & Checkout */}
                      {cartItems.length > 0 && (
                        <div 
                          className="px-4 py-6"
                          style={{ 
                            backgroundColor: colors.surface.main,
                            borderTop: `1px solid ${colors.border.main}`,
                          }}
                        >
                          {/* Subtotal */}
                          <div className="flex justify-between text-base font-semibold mb-4">
                            <p style={{ color: colors.text.primary }}>Subtotal</p>
                            <p style={{ color: colors.primary.main }}>₹{subtotal.toFixed(2)}</p>
                          </div>
                          
                          <p 
                            className="text-sm mb-4"
                            style={{ color: colors.text.secondary }}
                          >
                            Shipping and taxes calculated at checkout.
                          </p>

                          {/* Checkout Button */}
                          <button
                            onClick={handleCheckout}
                            className="w-full rounded-lg py-3 px-4 font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              backgroundColor: colors.primary.main,
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            }}
                          >
                            Proceed to Checkout
                          </button>

                          {/* Continue Shopping */}
                          <button
                            onClick={() => setIsOpen(false)}
                            className="w-full mt-3 rounded-lg py-2 px-4 font-medium transition-all duration-200"
                            style={{
                              backgroundColor: 'transparent',
                              color: colors.primary.main,
                              border: `1px solid ${colors.primary.main}`,
                            }}
                          >
                            Continue Shopping
                          </button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default FloatingCart;
