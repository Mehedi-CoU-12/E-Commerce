import React from 'react'
import profilePng from '../../images/Profile.png'
import { Rating } from '@mui/material';

const ReviewCard = ({review}) => {

    const options = {
        size:'large',
        value: review?.rating || 0,
        readOnly:true,
        precision:0.5,
    };

  return (
    <div className='reviewCard' >

        <img src={profilePng} alt="User"/>
        <p> {review.name} </p>
        <Rating {...options} />
        <span className='reviewCardSpan' > {review.comment} </span>
    </div>
  )
}

export default ReviewCard