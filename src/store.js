import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import ProductReducer from "./reducers/productReducers";
import {ProductDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from "./reducers/productReducers";
import CartReducer from "./reducers/CartReducer";
import userReducer, {userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from "./reducers/userReducer";
import {OrderReducer,OrderDetailsReducer,OrderPayReducer,OrderListMyReducer,orderListReducer,orderDeliverReducer} from "./reducers/OrderReducer";


const reducer = combineReducers({
  productList:ProductReducer,
  productDetails:ProductDetailsReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  productReviewCreate:productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart:CartReducer,
  userLogin:userReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate:OrderReducer,
  orderDetails:OrderDetailsReducer,
  orderPay:OrderPayReducer,
  orderListMy:OrderListMyReducer,
  orderList:orderListReducer,
  orderDeliver:orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart:{cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
  },
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;