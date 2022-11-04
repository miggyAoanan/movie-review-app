import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
// import { getMovies, addMovie } from "../../redux/movieSlice";
import { getActors, addActor, actorDetails, actorState } from "../../redux/actorSlice"

import ActorTable from "../../components/Table/ActorTable";

import { Actor } from '../../interfaces'


const ActorDashboard = () => {


  const actors = useAppSelector(actorDetails)
  const actorState = useAppSelector((state: RootState) => state.actors)

  const dispatch = useAppDispatch();
  console.log(actors);
  const initApp = useCallback(async () => {
    await dispatch(getActors());
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  let renderActorDetails

  renderActorDetails =

    actorState.getActorStatus === "fullfilled" ?
      actors?.map((actor, index) => <ActorTable key={index} {...actor} />)

      :

      (
        <div className="error">
          <h3>{actorState.errors}</h3>
        </div>
      )


  return (
    <div className="wrapper">
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {renderActorDetails}
        </tbody>
      </table>

      {/* <button type="button" className="btn btn-primary" onClick={toggleModal}>Add</button> */}
      {/* <AddMovieModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onAddMovie={onAddMovie}
      /> */}
    </div>
  )
}

export default ActorDashboard