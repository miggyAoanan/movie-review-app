import React from 'react'
import "./ActorCard.scss";
import { Actor } from '../../interfaces';
import { Link } from "react-router-dom";

const ActorCard = (props : Actor) => {

  const data = props
 
  return (
    <div className="card-item" key={data.id}>
        <Link to={`/actor/${data.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={data.imageURL} alt={data.firstName} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{data.firstName} {data.lastName}</h4>
            <p>{data.age}</p>
            <p>{data.gender}</p>
           
          </div>
        </div>
   
        </Link>
      </div>
   
  )
}

export default ActorCard