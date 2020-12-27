import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div>
            <Nav className='justify-content-center mb-4'></Nav>
            <Row>
            <Col xs={3} >
            <Nav.Item className='shippingStep1'>
                {step1 ? (
                    <LinkContainer className='shippingStep' to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='shippingStep' disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>
            </Col>
            <Col xs={3}>
            <Nav.Item className='shippingStep'>
                {step2 ? (
                    <LinkContainer className='shippingStep' to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='shippingStep' disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>
            </Col>
            <Col xs={3} >
            <Nav.Item className='shippingStep'>
                {step3 ? (
                    <LinkContainer className='shippingStep' to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='shippingStep' disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            </Col>
            <Col xs={3} >
            <Nav.Item className='shippingStep'>
                {step4 ? (
                    <LinkContainer className='shippingStep' to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='shippingStep' disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
            </Col>
            </Row>
        </div>
    )
}

export default CheckoutSteps;
