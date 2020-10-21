import React from 'react';
import Product from '../components/Product';
import products from '../products';
import {Row, Col} from 'react-bootstrap';

const HomeScreen = () => {
    return (
        <>
            <Row>
                {products.map( (product) => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default HomeScreen;
