import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loading from "../components/Loading";
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProducts} from "../actions/ProductsAction";
import ProductsCarousel from "../components/ProductsCarousel";


function HomeScreen({ history }) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  return (
    <div>
      <ProductsCarousel/>
      <h1>Latest Products</h1>
      {loading ? <Loading />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
      }
    </div>
  )
}

export default HomeScreen
