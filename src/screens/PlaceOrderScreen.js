import React, {useEffect} from "react";
import {Button,Row,Col,Image,Card,ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import notify from "../components/Toast";
import CheckoutSteps from "../components/CheckoutSteps";
import {createOrder} from "../actions/OrderAction";
import {ORDER_CREATE_RESET} from "../constants";
import ImageHelper from "../components/ImageHelper";






const PlaceOrderScreen = ({history}) =>{

  const orderCreate = useSelector(state =>state.orderCreate)
  const {order,error,success} = orderCreate


  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty , 0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 100000 ? 0 :100  ).toFixed(2)
  cart.taxPrice  = ((0.082) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) +Number(cart.shippingPrice) + Number(cart.taxPrice))


  if(!cart.paymentMethod){
    history.push('/payment')
  }

  useEffect(() =>{
    if(success){
      history.push(`/order/${order._id}`)
      dispatch({type:ORDER_CREATE_RESET})
    }
  },[success,history,dispatch,order])


  const placeOrder = () =>{
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:cart.itemsPrice,
      shippingPrice:cart.shippingPrice,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice
    }))
  }
  return(
    <div>
      {notify(error)}
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}
                {' '}
                {cart.shippingAddress.postalCode},
                {' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>{cart.paymentMethod}

              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              {cart.cartItems.length ===0 ? notify("Your Cart Is Empty") : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item,index)=>(
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image  src={ImageHelper(item.image)} alt={item.name} fluid rounded/>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} X {item.price} = ₹{(item.qty * item.price).toLocaleString('en-IN')}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>

          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{cart.totalPrice.toLocaleString('en-IN')}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <center><Button type='button' className='btn-block' disabled={cart.cartItems ===0 } onClick={placeOrder}>Place Order</Button></center>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen