import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import {createOrder} from '../actions/orderAction';

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    cart.shippingPrice = addDecimal(120);

    cart.totalPrice = addDecimal(Number(cart.itemsPrice) + Number(cart.shippingPrice));

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success, error} = orderCreate;

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success]);

    const PlaceOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }));
    }

    return (
        <>
           {/* <CheckoutSteps step1 step2 step3 step4 />  */}
           <Row>
               <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <CheckoutSteps step1 step2 step3 step4 />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong>
                                {userInfo.name}, {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.pinCode}, {cart.shippingAddress.state}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method : </strong>
                            {cart.paymentMethod ? cart.paymentMethod : (
                                <Message variant='danger'>Select a <Link to='/payment'>payment method</Link></Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2} xs={4}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col>
                                                            {item.qty} x ₹{item.price} = ₹{addDecimal(item.qty * item.price)}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                            )}
                        </ListGroup.Item>
                    </ListGroup> 
               </Col>
               <Col md={4} className='pt-4'>
                   <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={PlaceOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default PlaceOrderScreen;
