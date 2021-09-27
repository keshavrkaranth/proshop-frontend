import React,{useState} from "react";
import {Form,Button} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import notify from "../components/Toast";
import {saveShippingAddress} from "../actions/CartAction";
import CheckoutSteps from "../components/CheckoutSteps";



const ShippingScreen = ({history}) =>{

  const cart = useSelector(state => state.cart)
  const {shippingAddress}  = cart


  const dispatch = useDispatch()

  const [address,setAddress] = useState(shippingAddress.address)
  const [city,setCity] = useState(shippingAddress.city)
  const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
  const [country,setCountry] = useState(shippingAddress.country)


  const submitHandler = (e) =>{
    e.preventDefault()
    if(address===''){
      notify("Please Enter Your Address")
    }else{
      if(city===''){
        notify("Enter Your City")
      }else{
        if(postalCode===''){
          notify("Enter Your Postal Code")
        }else {
          if(country===''){
            notify("Enter Your Country")
          }else {
            dispatch(saveShippingAddress({address,city,postalCode,country}))
            history.push('/payment')
          }
        }
      }
    }
  }
  return(
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>


        <Form.Group controlId={address}>
          <Form.Label>Address</Form.Label>
          <Form.Control requried type='name' placeholder='Enter Your Address' value={address ? address : ''} onChange={(e) =>setAddress(e.target.value)}  />
        </Form.Group>

        <Form.Group controlId={city}>
          <Form.Label>City</Form.Label>
          <Form.Control  type='name' placeholder='Enter Your City' value={city ? city : ''} onChange={(e) =>setCity(e.target.value)}  />
        </Form.Group>

        <Form.Group controlId={postalCode}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control  type='name' placeholder='Enter Your Postal Code' value={postalCode ? postalCode : ''} onChange={(e) =>setPostalCode(e.target.value)}  />
        </Form.Group>

        <Form.Group controlId={country}>
          <Form.Label>Country</Form.Label>
          <Form.Control  type='name' placeholder='Enter your Country' value={country ? country : ''} onChange={(e) =>setCountry(e.target.value)}  />
        </Form.Group>
        <center><Button type='submit' variant='primary' className='mt-3'>Continue</Button></center>
      </Form>
    </FormContainer>
  )
}
export default ShippingScreen