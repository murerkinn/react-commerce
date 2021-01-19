import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { History } from 'history'
import { Row, Col, ListGroup, Image, Button, Card, Form } from 'react-bootstrap'
import Message from '../app/common/message'
import { addToCart, removeFromCart, CartItem } from './cart-store'
import { AppState } from '../app/store'

const Cart: FC<IProps> = ({ history, location, match }) => {
  const productId = match.params.id
  const qty = location.search ? location.search.split('=')[1] : 1

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state: AppState) => state.cart)

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    console.log('checkout')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="blue">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item: CartItem) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={e => dispatch(addToCart(item.product, +e.target.value))}
                    >
                      {[...((Array(item.countInStock).keys() as unknown) as number[])].map((x: number) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc: number, item: CartItem) => acc + item.qty, 0)}) items</h2>$
              {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

interface IProps {
  match: any
  location: any
  history: History
}

export default Cart
