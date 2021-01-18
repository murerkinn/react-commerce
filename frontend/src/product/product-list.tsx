import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../app/common/loader'
import Message from '../app/common/message'
import Product from './product'
import { getProducts, ProductData } from './product-store'
import { AppState } from '../app/store'

const Home: FC = () => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state: AppState) => state.productList)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products!.map((product: ProductData) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
