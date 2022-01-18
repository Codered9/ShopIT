import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/authActions';
import ProtectedRoute from './components/route/ProtectedRoute';
import ShippingInfo from './components/user/ShippingInfo';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/user/Cart';
import store from './store'
function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
        <Routes>
        <Route path = "/" element={<Home />}  />
        <Route path = "/search/:keyword" element={<Home />}  />
        <Route path = "/product/:id" element={<ProductDetails />}  />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route path = "/password/forgot" element={<ForgotPassword />} />
        <Route path = "/password/reset/:token" element={<NewPassword />} />
        <Route path = "/me" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        } />
        <Route path = "/me/update" element={
        <ProtectedRoute>
          <UpdateProfile />
        </ProtectedRoute>
        } />
        <Route path = "/password/update" element={
        <ProtectedRoute>
          <UpdatePassword />
        </ProtectedRoute>
        } />
        <Route path = "/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path = "/shipping" element={<ProtectedRoute><ShippingInfo /></ProtectedRoute>} />
        </Routes>
        
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
