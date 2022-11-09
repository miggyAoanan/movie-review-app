import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ActorCard from '../ActorCard/ActorCard'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getActors, actorDetails } from "../../redux/actorSlice";

import "./ActorMovie.scss"

const Actorlist = () => {
    const actors = useAppSelector(actorDetails)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (actors) {
            dispatch(getActors())
        }

    }, [dispatch])

    let renderActors
    renderActors =
        actors?.map((actor, index) => (
            <Link to={`/actor/${actor.id}`}>
                <ActorCard key={index} {...actor} />
            </Link>
        ))

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