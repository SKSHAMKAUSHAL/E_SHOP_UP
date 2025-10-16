import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineShoppingCart } from 'react-icons/md';

function NoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you&apos;re looking for seems to have wandered off. 
            Don&apos;t worry, let&apos;s get you back on track!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-pink-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <BiHomeAlt className="text-2xl group-hover:rotate-12 transition-transform" />
            <span>Go Home</span>
          </Link>
          
          <Link 
            to="/allproducts" 
            className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out border-2 border-gray-200 hover:border-purple-500"
          >
            <MdOutlineShoppingCart className="text-2xl group-hover:rotate-12 transition-transform" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-16">
          <p className="text-sm text-gray-500">
            Error Code: 404 | Page does not exist
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoPage;