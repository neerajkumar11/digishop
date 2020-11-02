import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Button, Card, FormControl} from 'react-bootstrap';
import Message from '../components/Message';
import {addToCart, removeFromCart} from '../actions/cartAction';

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        history.push('/login/redirect=shipping');
    }

    return (
        <Row>
            <Col md={6}>
                <h1>Shopping Cart</h1>
                {(cartItems.length === 0) ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={3} xs={4} className='pl-0 pr-0'>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={9} xs={8}>
                                        <Row className='pb-2'>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row className='pt-1'>
                                            <Col xs={5} md={3} className='price'>
                                                ₹{item.price}
                                            </Col>
                                            <Col xs={5} md={3} className='pl-0 '>
                                                <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))}
                                                </FormControl>
                                            </Col>
                                            <Col xs={2} md={3} className='pl-0'>
                                                <Button
                                                    className='trashBtn'
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='far fa-trash-alt itrash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={6} className='pt-5'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={9} md={7}>
                                    <h5>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h5>
                                </Col>
                                <Col xs={3} md={5} className='pl-0'>
                                    ₹{cartItems.reduce((acc, item) => acc+ (item.qty * item.price), 0)}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={9} md={7}>
                                    <h5>Shipping Cost</h5>
                                </Col>
                                <Col xs={3} md={5} className='pl-0'>
                                    ₹240
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={9} md={7}>
                                    <h5>Total Price</h5>
                                </Col>
                                <Col xs={3} md={5} className='pl-0'>
                                    ₹{cartItems.reduce((acc, item) => acc+ (item.qty * item.price), 0) + 240}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
