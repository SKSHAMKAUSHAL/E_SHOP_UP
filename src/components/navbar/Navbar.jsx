import { Fragment, useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { FaShieldAlt, FaHeart } from 'react-icons/fa';
import { getThemeColors, getThemeShadow } from '../../utils/colorUtils';
import Logo from '../logo/Logo';

function Navbar() {
  const [open, setOpen] = useState(false);
  const context = useContext(myContext);
  const { mode, toggleMode, wishlist, getWishlistData } = context;
  const colors = getThemeColors(mode);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId = user?.user?.uid;
  const isAdmin = user?.user?.email === 'skshamkaushal@gmail.com';

  // Load wishlist on component mount
  useEffect(() => {
    if (userId) {
      getWishlistData(userId);
    }
  }, [userId]);

  const logout = () => {
    localStorage.clear('user');
    navigate('/');
  };

  const cartItems = useSelector((state) => state.cart);


  return (
    <div className="sticky top-0 z-50" 
      style={{ 
        backgroundColor: colors.background.primary,
        boxShadow: getThemeShadow(mode, 'lg'),
      }}>
      {/* Trust Banner */}
      <div className="flex h-8 sm:h-10 items-center justify-center px-2 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-300"
        style={{
          background: mode === 'dark' 
            ? `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.primary.main} 100%)`
            : `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.primary.main} 100%)`,
          color: 'white'
        }}>
        <FaShieldAlt className="mr-1 sm:mr-2 text-xs sm:text-base flex-shrink-0" />
        <span className="hidden sm:inline">100% Secure Shopping | </span>
        <span className="truncate">Free Delivery on Orders Over ₹300</span>
      </div>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl" 
                style={{ 
                  backgroundColor: colors.surface.main,
                  color: colors.text.primary,
                }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 transition-colors duration-300"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.target.style.color = colors.text.primary}
                    onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 px-4 py-6"
                  style={{ borderTop: `1px solid ${colors.border.main}` }}>

                  <Link 
                    to={'/allproducts'} 
                    className="text-sm font-medium block transition-colors duration-300" 
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                    onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                  >
                    All Products
                  </Link>
                  
                  <div className="flow-root">
                    <Link 
                      to={'/wishlist'} 
                      className="-m-2 block p-2 font-medium transition-colors duration-300"
                      style={{ color: colors.text.primary }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                      onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                    >
                      Wishlist ({wishlist.length})
                    </Link>
                  </div>
                  
                  <div className="flow-root">
                    <Link 
                      to={'/order'} 
                      className="-m-2 block p-2 font-medium transition-colors duration-300"
                      style={{ color: colors.text.primary }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                      onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                    >
                      Order
                    </Link>
                  </div>

                  {isAdmin ? <div className="flow-root">
                    <Link 
                      to={'/dashboard'} 
                      className="-m-2 block p-2 font-medium transition-colors duration-300"
                      style={{ color: colors.text.primary }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                      onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                    >
                      admin
                    </Link>
                  </div> : null}

                  {user ? <div className="flow-root">
                    <a 
                      onClick={logout} 
                      className="-m-2 block p-2 font-medium cursor-pointer transition-colors duration-300"
                      style={{ color: colors.semantic.error }}
                      onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                      onMouseLeave={(e) => e.target.style.color = colors.semantic.error}
                    >
                      Logout
                    </a>
                  </div> : null}
                  
                </div>

                <div 
                  className="px-4 py-6"
                  style={{ borderTop: `1px solid ${colors.border.main}` }}
                >
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium" style={{ color: colors.text.primary }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative">
        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8" 
          style={{ 
            backgroundColor: colors.surface.main,
            borderTop: `1px solid ${colors.border.main}`,
          }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md p-2 lg:hidden transition-colors duration-300"
                onClick={() => setOpen(true)} 
                style={{ 
                  backgroundColor: colors.surface.hover,
                  color: colors.text.primary,
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.surface.active}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.surface.hover}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-2 sm:ml-4 flex lg:ml-0">
                <Logo 
                  size="medium" 
                  showText={true} 
                  variant={mode === 'dark' ? 'white' : 'default'}
                />
              </div>

              <div className="ml-auto flex items-center gap-1 sm:gap-2">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link 
                    to={'/allproducts'} 
                    className="text-sm font-medium transition-all duration-300" 
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                    onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                  >
                    All Products
                  </Link>
                  <Link 
                    to={'/order'} 
                    className="text-sm font-medium transition-all duration-300" 
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                    onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                  >
                    Order
                  </Link>

                  {isAdmin &&
                   <Link 
                     to={'/dashboard'} 
                     className="text-sm font-medium transition-all duration-300" 
                     style={{ color: colors.text.primary }}
                     onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                     onMouseLeave={(e) => e.target.style.color = colors.text.primary}
                   >
                    Admin
                  </Link>
                }
                 

                  {user ? <a 
                    onClick={logout} 
                    className="text-sm font-medium cursor-pointer transition-all duration-300" 
                    style={{ color: colors.semantic.error }}
                    onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.color = colors.semantic.error}
                  >
                    Logout
                  </a> : <Link 
                    to={'/signup'} 
                    className="text-sm font-medium cursor-pointer transition-all duration-300" 
                    style={{ color: colors.accent.main }}
                    onMouseEnter={(e) => e.target.style.color = colors.accent.hover}
                    onMouseLeave={(e) => e.target.style.color = colors.accent.main}
                  >
                    Signup
                  </Link>}

                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: colors.text.primary }}>INDIA</span>
                  </a>
                </div>

                {/* Theme Toggle */}
                <div className="flex lg:ml-6">
                  <button 
                    className='p-2 rounded-lg transition-all duration-300' 
                    onClick={toggleMode}
                    style={{ 
                      color: colors.text.primary,
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.surface.hover;
                      e.currentTarget.style.color = colors.primary.main;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text.primary;
                    }}
                  >
                    {mode === 'light' ?
                      (<FiSun className='' size={24} />
                      ) : (
                        <BsFillCloudSunFill size={24} />
                      )}
                  </button>
                </div>

                {/* Wishlist */}
                <div className="flow-root">
                  <Link 
                    to={'/wishlist'} 
                    className="group -m-2 flex items-center p-2 relative rounded-lg transition-all duration-300 touch-manipulation" 
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.surface.hover;
                      e.currentTarget.style.color = colors.semantic.error;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text.primary;
                    }}
                  >
                    <FaHeart className="w-5 h-5 sm:w-6 sm:h-6" />
                    {wishlist.length > 0 && (
                      <span 
                        className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: colors.semantic.error,
                          color: 'white',
                        }}
                      >
                        {wishlist.length}
                      </span>
                    )}
                    <span className="sr-only">items in wishlist</span>
                  </Link>
                </div>

                {/* Cart */}
                <div className="flow-root">
                  <Link 
                    to={'/cart'} 
                    className="group -m-2 flex items-center p-2 rounded-lg transition-all duration-300 touch-manipulation" 
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.surface.hover;
                      e.currentTarget.style.color = colors.primary.main;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text.primary;
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span 
                      className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: colors.primary.main,
                        color: 'white',
                      }}
                    >
                      {cartItems.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar;