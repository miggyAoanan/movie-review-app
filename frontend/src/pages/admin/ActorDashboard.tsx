import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getActors, addActor, actorDetails, actorState } from "../../redux/actorSlice"

import { Actor } from '../../interfaces'
import AddActorModal from "../../components/Modal/AddActorModal";
import './Dash.scss'

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

  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }
  const onBackdropClick = () => {
    setIsModalVisible(false)
  }


  return (
    <div className="wrapper">
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Actor Name</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {actors ? (
            actors.map((actor, index) => {
              return (
                <tr key={actor.id}>
                  <td>{index + 1}</td>
                  <td>{actor.firstName}&nbsp;{actor.lastName}</td>
                  <td><img src={actor.imageURL} alt={actor.lastName} className='imageDash' /></td>
                  <td>

                    <button type="button" className="btn btn-secondary">Edit</button>
                    &nbsp;
                    <button type="button" className="btn btn-danger">Delete</button>

                  </td>
                </tr>
              )
            })
          ) : ""}
        </tbody>
      </table>

      <button type="button" className="btn btn-primary" onClick={toggleModal}>Add</button>
      <AddActorModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}

      />
    </div>
  )
}

export default ActorDashboard