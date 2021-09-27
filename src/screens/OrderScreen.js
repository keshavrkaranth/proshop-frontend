import React, {useEffect, useState} from "react";
import {Row,Col,Image,Card,ListGroup,Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import notify from "../components/Toast";
import Loading from "../components/Loading";
import {deliverOrder, getOrderDetails, payOrder} from "../actions/OrderAction";
import Message from "../components/Message";
import {ORDER_DELIVER_RESET, payPalClientId} from "../constants";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from "../constants";
import ImageHelper from "../components/ImageHelper";




const OrderScreen = ({match,history}) => {

  const orderId = match.params.id
  const dispatch = useDispatch()


  const [sdkReady,setSdkReady] = useState(false)

  const orderDetails = useSelector(state =>state.orderDetails)
  const {order,error,loading} = orderDetails


  const orderPay= useSelector(state =>state.orderPay)
  const {loading:loadingPay,success:successPay} = orderPay


  const orderDeliver= useSelector(state =>state.orderDeliver)
  const {loading:loadingDeliver,success:successDeliver} = orderDeliver


  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin



  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty , 0).toFixed(2)
  }


  const addPayPalScript = () =>{
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}`
    script.onload = () =>{
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }


  useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }

    if(!order || successPay || order._id !== Number(orderId) || successDeliver){
      dispatch({type:ORDER_PAY_RESET})
      dispatch({type:ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else {
        setSdkReady(true)
      }
    }

  },[dispatch,order,orderId,successPay,successDeliver,history,userInfo])




  const successPaymentHandler = (paymentResult) =>{
    dispatch(payOrder(orderId,paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  return(
    loading ? <Loading/>
      :error ? notify(error)
      :(
          <div>

            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name:</strong>{order.user.name}</p>
                    <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                      <strong>Shipping:</strong>{order.shippingAddress.address}, {order.shippingAddress.city}
                      {' '}
                      {order.shippingAddress.postalCode},
                      {' '}
                      {order.shippingAddress.country}
                    </p>

                    {
                      order.isDelivered ? (
                          <Message variant='success'>Delivered  On {order.deliveredAt}</Message>
                        ):

                        (
                          <Message variant='warning'>Not Delivered</Message>
                        )


                    }
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method:</strong>{order.paymentMethod}
                    </p>
                    {
                      order.isPaid ? (
                        <Message variant='success'>Paid On {order.paidAt}</Message>
                      ):

                        (
                          <Message variant='warning'>Not Paid</Message>
                        )


                    }
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order items</h2>
                    {order.orderItems.length ===0 ? notify("Your Order Is Empty") : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item,index)=>(
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
                        <Col>₹{order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>₹{order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>₹{order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total:</Col>
                        <Col>₹{order.totalPrice.toLocaleString('en-IN')}</Col>
                      </Row>
                    </ListGroup.Item>
                    {

                      !order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loading/>}
                          {!sdkReady ?(
                            <Loading/>
                          ) : (
                            userInfo.isAdmin ?  null :(
                            <PayPalButton amount={order.totalPrice } onSuccess={successPaymentHandler}/>
                              )
                          )}
                        </ListGroup.Item>
                      )

                    }

                  </ListGroup>

                  {loadingDeliver && <Loading />}
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <center><Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button></center>
                    </ListGroup.Item>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        )
  )
}

export default OrderScreen