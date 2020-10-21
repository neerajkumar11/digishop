import React from 'react';

const Star = (props) => {
    return (
        <>
           <span className='star'>
               <i style={{color: props.colour}} className={props.value === 1 ? 'fas fa-star' : props.value === 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
           </span> 
        </>
    )
}

Star.defaultProps = {
    colour : '#f8e825',
}

export default Star;
