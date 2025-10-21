import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FloatingCart from '../cart/FloatingCart'

function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className="content">
            {children}
        </div>
        <Footer/>
        <FloatingCart />
    </div>
  )
}

export default Layout