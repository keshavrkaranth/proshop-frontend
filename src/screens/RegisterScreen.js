import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loading from "../components/Loading";
import {register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import notify from "../components/Toast";





const RegisterScreen = ({location,history}) =>{



  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")


  const redirect = location.search ? location.search.split('=')[1] :'/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {error,loading,userInfo} = userRegister

  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])




  const submitHandler = (e) =>{
    e.preventDefault()

      if(name===''){
        notify('Name should not be Empty')
      }else{
        if (email===''){
          notify('Email should not be Empty')
        }
        else{
          if(password==='' || confirmpassword ===''){
            notify('Passwords Should not be Empty')
          }else {
            if(password !== confirmpassword){
              notify('Passwords Do Not Match')
            }

            else{
              dispatch(register(name,email,password))
            }
          }
        }
      }


  }

  return(

    <FormContainer>
      <h1>Sign Up</h1>
      {/*{message && <Message variant='danger'>{message}</Message>}*/}
      {error && notify(error)}
      {loading && <Loading />}

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

        <center><Button type='submit' variant='primary' className='mt-3'>Sign Up</Button></center>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )


}

export default RegisterScreen