import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderDetails} from '../actions/orderAction';

const OrderScreen = ({ match }) => {
    
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const orderDetails = useSelector(state => state.orderCreate);
    const {order, loading, error} = orderDetails;

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order {order._id}.</h1>
        <Row>
               <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong>
                                {userInfo.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pinCode}, {order.shippingAddress.state}, {order.shippingAddress.country}
                            </p>
                            <p>
                                <strong>Contacts : </strong>
                                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Deliverd</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>Method : </strong>
                            {order.paymentMethod ? order.paymentMethod : (
                                <Message variant='danger'>Select a <Link to='/payment'>payment method</Link></Message>
                            )}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>You have no orders</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                   </Card>
               </Col>
           </Row>
    </>
}

export default OrderScreen;
