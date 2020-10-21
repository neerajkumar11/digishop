import React from 'react';
import Star from './Star';

const Rating = (props) => {
    return (
        <>
           <Star value ={props.rating >= 1 ? 1 : props.rating >= 0.5 ? 0.5 : 0}></Star>
           <Star value ={props.rating >= 2 ? 1 : props.rating >= 1.5 ? 0.5 : 0}></Star>
           <Star value ={props.rating >= 3 ? 1 : props.rating >= 2.5 ? 0.5 : 0}></Star>
           <Star value ={props.rating >= 4 ? 1 : props.rating >= 3.5 ? 0.5 : 0}></Star>
           <Star value ={props.rating >= 5 ? 1 : props.rating >= 4.5 ? 0.5 : 0}></Star>
           <span> {props.ratingNum && props.ratingNum} reviews</span>
        </>
    )
}

export default Rating;
