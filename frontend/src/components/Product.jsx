import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating';

const Product = (props) => {
    return (
        <>
          <Card className='my-3 p-3 rounded'>
            <a href={`/product/${props.product._id}`}>
              <Card.Img src={props.product.image} variant='top' />
            </a>
            <Card.Body>
              <a href={`/product/${props.product._id}`}>
                <Card.Title as='div'>
                  <strong>{props.product.name}</strong>
                </Card.Title>
              </a>
              <Card.Text as='div'>
                <div className='my-3'>
                  <Rating rating={props.product.rating} ratingNum={props.product.numReviews}/>
                </div>
              </Card.Text>
              <Card.Text as='h3'>${props.product.price}</Card.Text>
            </Card.Body>
          </Card>  
        </>
    )
}

export default Product;
