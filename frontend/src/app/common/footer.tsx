import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer: FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; React E-Commerce | Made by Murat Erkin Cicek</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
