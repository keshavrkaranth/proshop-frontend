import React,{useEffect,useState} from "react";
import {Form,Button,Row,Col,Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import {useDispatch,useSelector} from "react-redux";
import Loading from "../components/Loading";
import { updateUserProfile,getUserDetails} from "../actions/userActions";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {USER_UPDATE_PROFILE_RESET} from "../constants";
import {listMyOrders} from "../actions/OrderAction";



toast.configure()

const ProfileScreen = ({history}) =>{

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")


  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const {error,loading,user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const {loading:loadingOrders,error:errorOrders,orders} = orderListMy




  useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }else {
      if(!user || !user.name || success){
        dispatch({type:USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, history, userInfo, user, success])


  const notify = (message) =>{
    toast.error(message,{position:toast.POSITION.TOP_RIGHT})
  }

  const submitHandler = (e) =>{
    e.preventDefault()
          if(password !== confirmpassword) {
            notify('Passwords Do Not Match')
          }
          else{
            updateUserProfile({
              'id':user._id,
              'name':name,
              'email':email,
              'password':password,
              'token':userLogin.userInfo.token
            })
          }
  }

  return(
    <Row>
      {error && notify(error)}
      {loading && <Loading />}
      <Col md={3}><h2>My profile</h2>
        <Form onSubmit={submitHandler}>

          <Form.Group controlId={name}>
            <Form.Label>Enter Name</Form.Label>
            <Form.Control requried type='name' placeholder='Enter Name' value={name} onChange={(e) =>setName(e.target.value)}  />
          </Form.Group>

          <Form.Group controlId={email}>
            <Form.Label>Enter Email</Form.Label>
            <Form.Control requried type='email' placeholder='Enter Name' value={email} onChange={(e) =>setEmail(e.target.value)}  />
          </Form.Group>

          <Form.Group controlId={password}>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control requried type='password' placeholder='Enter Password' value={password} onChange={(e) =>setPassword(e.target.value)}  />
          </Form.Group>


          <Form.Group controlId={confirmpassword}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control requried type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) =>setConfirmPassword(e.target.value)}  />
          </Form.Group>

          <center><Button type='submit' variant='primary' className='mt-3' >Update</Button></center>
        </Form>

      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          notify(errorOrders)
        ) : (
          <Table striped responsive className='table-sm'>
            <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )}

      </Col>
    </Row>
  )

}
export default ProfileScreen