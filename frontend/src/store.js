import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { productsReducers, productDetailsReducer, newReviewReducer,productReducer, newProductReducer,getReviewReducer ,reviewReducer} from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';
const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    allUsers: allUsersReducer,
    product: productReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    productReviews: getReviewReducer,
    review: reviewReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') 
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store