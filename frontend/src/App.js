// Dependecies import
import './App.css';
import store from './store'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Fragment } from 'react'
// Layout Imports
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home';

// Product Imports
import Cart from './components/user/Cart';
import ShippingInfo from './components/user/ShippingInfo';
import ProductDetails from './components/product/ProductDetails';
import ListOrders from './components/orders/ListOrders';
import ConfirmOrder from './components/user/ConfirmOrder';
import OrderSuccess from './components/user/OrderSuccess';
import OrderDetails from './components/orders/OrderDetails';
import Payment from './components/user/Payment';

//Admin Imports
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import CreateProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList.js'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList.js'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews';

// User and Authentication Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/authActions';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Fragment className="container container-fluid">
        <Route path = "/" element={<Home />}  />
        
        {/* Authentication routes */}
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route path = "/password/update" element={<ProtectedRoute> <UpdatePassword /></ProtectedRoute>} />
        <Route path = "/password/forgot" element={<ForgotPassword />} />
        <Route path = "/password/reset/:token" element={<NewPassword />} />
        
        {/* Product Routes */}
        <Route path = "/search/:keyword" element={<Home />}  />
        <Route path = "/product/:id" element={<ProductDetails />}  />
        <Route path = "/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      
        {/* User Routes */}
        <Route path = "/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path = "/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path = "/shipping" element={<ProtectedRoute><ShippingInfo /></ProtectedRoute>} />
        <Route path = "/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
        <Route path = "/orders/me" element={<ProtectedRoute><ListOrders /></ProtectedRoute>} />
        <Route path = "/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path = "/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        {stripeApiKey && <Route path = '/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><ProtectedRoute><Payment /></ProtectedRoute></Elements>}  />
                          }
        
        {/*  Admins */}

        </Fragment>
        <Route path = "/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path = "/admin/products" element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>} />
        <Route path = "/admin/orders" element={<ProtectedRoute isAdmin={true}><OrdersList /></ProtectedRoute>} />
        <Route path = "/admin/product" element={<ProtectedRoute isAdmin={true}><CreateProduct /></ProtectedRoute>} />
        <Route path = "/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
        <Route path = "/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>} />
        <Route path = "/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
        <Route path = "/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
        <Route path = "/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
