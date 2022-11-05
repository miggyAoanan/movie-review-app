import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getActors, actorDetails, deleteActor, updateActor } from "../../redux/actorSlice"


import { Actor } from '../../interfaces'
import AddActorModal ,{DeleteActorFunction, UpdateActorFunction} from "../../components/Modal/AddActorModal";
import './Dash.scss'




const ActorDashboard = () => {
  const actors = useAppSelector(actorDetails)
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getActors());
    console.log("im called")
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  
  const [isModalVisible, setIsModalVisible] = useState(false)// add
  const [updateId, setUpdateId] = useState("") 
  const [deleteId, setDeleteId] = useState("") 

  //test update
  const [actorForUpdate, setActorForUpdate] = useState<Actor>()

  //toggle add modal
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
  }

  const setUpdateActorId = (id:string) =>{
    setUpdateId(id)
  
  }

  const setDeleteActorId = (id:string) =>{
    setDeleteId(id)
  }


  const clearUpdate =() =>{
    setUpdateId("")
  }

  const clearDelete =() =>{
    setDeleteId("")
  }

  const clear =() => {
    clearDelete()
    clearUpdate()
  } 

  //testing delete

  const onDeleteActor: DeleteActorFunction = async (id:string) => {
   
    await dispatch(deleteActor(id)).then((res) => {
      console.log(res)
      console.log("im testing the delete")
      initApp()
    })

  }

  const onUpdateActor : UpdateActorFunction = async (args: Actor) => {

    console.log(args)
    dispatch(updateActor(args)).then((res)=>{
      console.log(res)
    })

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

                    <button 
                    type="button" 
                    className="btn btn-secondary"
                  
                    onClick={() => { toggleModal();clearDelete(); setUpdateActorId(actor.id!); setActorForUpdate(actor)}}
                    >Edit</button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => { toggleModal(); clearUpdate() ; setDeleteActorId(actor.id!)}}
                    >Delete</button>

                  </td>
                </tr>
              )
            })
          ) : ""}
        </tbody>
      </table>

      <button 
      type="button" 
      className="btn btn-primary" 
      
      onClick={() => { toggleModal(); clear()}}
      >Add</button>

      <AddActorModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        forUpdateId={updateId}
        forDeleteId={deleteId}
        onDeleteActor={onDeleteActor}
        onUpdateActor={onUpdateActor}
        actorForUpdate={actorForUpdate}
      />
      
    </div>
  )
}

export default ActorDashboard