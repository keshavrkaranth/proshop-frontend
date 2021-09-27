import React from "react";
import { Card} from 'react-bootstrap'
import Ratings from "./Ratings";
import {Link } from 'react-router-dom'
import ImageHelper from "./ImageHelper";




const Product = ({product}) =>{
  return(
  <Card className="my-3 p-3 rounded">
    <Link to={`/product/${product._id}`}>
      <Card.Img src={ImageHelper(product.image)}/>

    </Link>
    <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      <Card.Text>
        <div className='my-3'>

          <Ratings value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
        </div>
      </Card.Text>
      <Card.Text as='h3'>
        <span><strong>₹</strong></span>{Math.round(product.price)}
      </Card.Text>
    </Card.Body>

  </Card>
  )
}

export default Product