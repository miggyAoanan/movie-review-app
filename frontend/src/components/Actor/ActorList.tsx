import React from "react";
import ActorCard from '../ActorCard/ActorCard'
import {  useAppSelector } from '../../store/store'
import { actorDetails } from "../../redux/actorSlice";

import "./ActorMovie.scss"

const Actorlist = () => {
    const actors = useAppSelector(actorDetails)
    return (
        <div className="actor-wrapper">
            <div className="actor-list">
                <h2>Actors </h2>


                <div className="actor-container">{
               actors && actors.length > 0 ? 
               actors?.map((actor, index) => (<ActorCard key={index} {...actor} />))
               : <div className="actor-error">
               <h3>No actors found</h3>
             </div>

                }</div>
            </div>

        </div>
    )
}

export default Actorlist