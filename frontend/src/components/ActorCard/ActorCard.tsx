import React from 'react'
import "./ActorCard.scss";

import { Actor } from '../../interfaces';


const ActorCard = (props : Actor) => {

  const data = props
  // return(<h1></h1>)
  return (
    <div className="card-item">
    
        <div className="card-inner">
          <div className="card-top">
            <img src={data.imageURL} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{data.firstName} {data.lastName}</h4>
            <p>{data.age}</p>
            <p>{data.gender}</p>
           
          </div>
        </div>
   

      </div>
   
  )
}

export default ActorCard