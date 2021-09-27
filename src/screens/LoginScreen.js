import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {login} from "../actions/userActions";
import FormContainer from "../components/FormContainer";


const LoginScreen = ({location,history}) =>{

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const redirect = location.search ? location.search.split('=')[1] :'/'

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {error,loading,userInfo} = userLogin

  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(login(email,password))
  }

  return(
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={email}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) =>setEmail(e.target.value)}  />

          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) =>setPassword(e.target.value)}  />




        </Form.Group>
        <center><Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button></center>

        <Row className='py-3'>
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
        </Row>

      </Form>
    </FormContainer>
  )
}

export default LoginScreen