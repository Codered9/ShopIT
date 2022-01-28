import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logoutUser } from '../../actions/authActions'
const linktologo = `/images/logo.png`
const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.cart)
  const logoutUserHandler = () => {
    dispatch(logoutUser());
    alert.success('Logged out successfully', {timeout: 2000})
  }
  // console.log(user.name);
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src={linktologo} alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <span className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span ><Link to="/cart" style={{ textDecoration: 'none' }} >
            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link></span>
          <span>
            {user ?
              (
                <span className="ml-4 dropdown d-inline">
                  <button className="btn btn-secondary dropdown-toggle mr-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <figure className="avatar avatar-nav">
                      <img src={user.avatar && user.avatar.url}
                        alt={user && user.name}
                        className='rounded-circle mr-2' />
                      <span >{user && user.name}</span>
                    </figure>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {user && user.role === 'admin' && (
                      <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                      )}
                        <li><Link className="dropdown-item" to="/orders/me">Orders</Link></li>
                        <li><Link className="dropdown-item" to="/me">Profile</Link></li>
                        <li><Link className="dropdown-item text-danger" to="/" onClick={logoutUserHandler}>Logout</Link></li>
                  </ul>
                </span>
              )
              : !loading &&
              <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>
            }</span>
        </span>
      </nav>
    </Fragment>
  )
}

export default Header
