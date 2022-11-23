import React from 'react'
import { Rating } from 'react-simple-star-rating'
import dayjs from "dayjs";
import { Review } from '../../interfaces';
import './ReviewCard.scss'


export const ReviewCard = (props: Review) => {
    const data = props
   
  return (
    <div className="reviewCardContainer mb-4">

      <div className='topSection'>
        <h2>A review by {data.userName} &nbsp; 
        <Rating

        className='rate'
        size={22}
        initialValue={data.rating} />
        <span data-testid="rating">{data.rating}/5</span>
                    </h2>
        <p>Written by <span className='userName'>{data.userName}</span> on  {dayjs(data.datePosted).format("MM-DD-YYYY")}</p>
      </div>
      <div className='desc'>
        <p data-testid="description">{data.description}</p>
      </div>
     
    </div>
  )
}
