import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import Wishlist from './pages/wishlist/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </MyState>
  );
}

export default App;

// Protected Route for authenticated users
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

// Protected Route for admin users
const ProtectedRouteForAdmin = ({ children }) => {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    const admin = JSON.parse(user);
    
    if (admin?.user?.email === 'skshamkaushal@gmail.com') {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // If parsing fails, redirect to login
    return <Navigate to="/login" />;
  }
};