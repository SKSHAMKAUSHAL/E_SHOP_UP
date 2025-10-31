import { useEffect, useState } from 'react';
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function MyState(props) {
  // Initialize mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'light'; // Changed default to 'light'
  });
  const [loading, setLoading] = useState(false);

  // Apply theme on mount and mode change
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = 'rgb(15, 23, 42)'; // Updated to match color scheme
    } else {
      document.body.style.backgroundColor = '#f8fafc'; // Updated to match color scheme
    }
    // Save to localStorage whenever mode changes
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    images: [],
    category: null,
    description: null,
    type: '', // e.g., 'clothes' | 'shoes' | 'liquid'
    variations: [], // array of strings like ['S','M'] or ['50ml'] or ['7','8']
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }

    // If type is selected, require at least one variation for better data quality
    if (products.type && Array.isArray(products.variations) && products.variations.length === 0) {
      return toast.error('Please add at least one variation for the selected product type')
    }

    // Check for duplicate products
    const duplicate = product.find(p => 
      p.title.toLowerCase().trim() === products.title.toLowerCase().trim() &&
      p.category.toLowerCase().trim() === products.category.toLowerCase().trim()
    );

    if (duplicate) {
      return toast.error('Product already exists with this title and category!', {
        position: "top-center",
        autoClose: 3000,
      });
    }

    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product added successfully! 🎉", {
        position: "top-center",
        autoClose: 2000,
      })
      getProductData()
      setLoading(false)
      // Reset products state
      setProducts({
        title: null,
        price: null,
        imageUrl: null,
        images: [],
        category: null,
        description: null,
        type: '',
        variations: [],
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      })
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      })
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      toast.error("Failed to load products")
      setLoading(false)
    }
  }


  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      toast.error("Failed to update product")
      setLoading(false)
    }
    setProducts("")
  }

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }


  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load orders")
      setLoading(false)
    }
  }


  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load users")
      setLoading(false)
    }
  }




  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  // Wishlist Functions
  const [wishlist, setWishlist] = useState([]);

  // Get wishlist from Firebase
  const getWishlistData = async (userId) => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "wishlist"));
      const wishlistArray = [];
      result.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userId) {
          wishlistArray.push({ ...data, id: doc.id });
        }
      });
      setWishlist(wishlistArray);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load wishlist");
      setLoading(false);
    }
  };

  // Add to wishlist in Firebase
  const addToWishlistBackend = async (product, userId) => {
    setLoading(true);
    try {
      // Check if already exists
      const result = await getDocs(collection(fireDB, "wishlist"));
      let exists = false;
      result.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userId && data.productId === product.id) {
          exists = true;
        }
      });

      if (!exists) {
        await addDoc(collection(fireDB, "wishlist"), {
          userId: userId,
          productId: product.id,
          product: product,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        });
        toast.success('Added to wishlist ❤️');
        getWishlistData(userId);
      } else {
        toast.info('Already in wishlist');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Failed to add to wishlist');
      setLoading(false);
    }
  };

  // Remove from wishlist in Firebase
  const removeFromWishlistBackend = async (wishlistItemId, userId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "wishlist", wishlistItemId));
      toast.info('Removed from wishlist');
      getWishlistData(userId);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to remove from wishlist');
      setLoading(false);
    }
  };

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')



  return (
    <MyContext.Provider value={{
     mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
      updateProduct,edithandle,deleteProduct,order,user,
      searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice,
      wishlist, getWishlistData, addToWishlistBackend, removeFromWishlistBackend
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState