import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, match } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap'
import Loader from '../app/common/loader'
import Message from '../app/common/message'
import Rating from './rating'
import { AppState } from '../app/store'
import { getProductDetails } from './product-store'

const ProductDetails: FC<IProps> = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [match, dispatch])

  const { product, loading, error } = useSelector((state: AppState) => state.productDetails)

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading || product == null ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product!.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

interface IProps {
  match: match<Identifiable>
}

interface Identifiable {
  id: string
}

export default ProductDetails
