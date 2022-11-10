import React from "react";
import ActorCard from '../ActorCard/ActorCard'
import {  useAppSelector } from '../../store/store'
import { actorDetails } from "../../redux/actorSlice";

import "./ActorMovie.scss"

const Actorlist = () => {
    const actors = useAppSelector(actorDetails)
    let renderActors
    renderActors =
        actors?.map((actor, index) => (<ActorCard key={index} {...actor} />))

    return (
        <div className="actor-wrapper">
            <div className="actor-list">
                <h2>Actors </h2>
                <div className="actor-container">{renderActors}</div>
            </div>

        </div>
    )
}

export default Actorlist