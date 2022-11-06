import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getActors, actorDetails, deleteActor, updateActor } from "../../redux/actorSlice"


import { Actor } from '../../interfaces'
import AddActorModal ,{DeleteActorFunction, UpdateActorFunction} from "./modal/AddActorModal";
import './Dash.scss'
import DeleteActorModal from "./modal/DeleteActorModal";
import UpdateActorModal from "./modal/UpdateActorModal";


const ActorDashboard = () => {
  const actors = useAppSelector(actorDetails)
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    if(actors){
     dispatch(getActors()) 
    }
    
  }, [dispatch])

  
  const [isModalVisible, setIsModalVisible] = useState(false)// add
  const [updateId, setUpdateId] = useState("") 


  //test update
  const [actorForUpdate, setActorForUpdate] = useState<Actor>()
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const toggleEditModal = () => {
    setEditModalVisible(isEditModalVisible => !isEditModalVisible)
  }

  //toggle add modal
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  //delete modal
  const [deleteId, setDeleteId] = useState("")
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const toggleDeleteModal = () => {
    setDeleteModalVisible(isDeleteModalVisible => !isDeleteModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
    setDeleteModalVisible(false)
    setEditModalVisible(false)
    // clear()
  }

  const setUpdateActorId = (id:string) =>{
    setUpdateId(id)
  
  }

  // const clearUpdate =() =>{
  //   setUpdateId("")
  // }

  // const clearDelete =() =>{
  //   setDeleteId("")
  // }

  // const clear =() => {
  //   clearDelete()
  //   clearUpdate()
  // } 

  //testing delete

  // const onDeleteActor: DeleteActorFunction = async (id:string) => {
  //  console.log(id)
    

  // }

  
  const onDeleteActor : DeleteActorFunction = async (id: string) => {
   
    dispatch(deleteActor(id)).then((res)=>{
      // initApp()
      onBackdropClick()
    })
  }


  const onUpdateActor : UpdateActorFunction = async (args: Actor) => {

    dispatch(updateActor(args)).then((res)=>{
      // initApp()
      onBackdropClick()
        
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
                  
                    onClick={() => { toggleEditModal(); setActorForUpdate(actor)}}
                    >Edit</button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => { toggleDeleteModal(); setDeleteId(actor.id!)}}
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
      
      onClick={() => { toggleModal()}}
      >Add</button>

      <AddActorModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        forUpdateId={updateId}
        onUpdateActor={onUpdateActor}
        actorForUpdate={actorForUpdate}
      />

      <UpdateActorModal 
      onClose={onBackdropClick}
      isEditModalVisible={isEditModalVisible}
      onUpdateActor={onUpdateActor}
      actorForUpdate={actorForUpdate}
      
      />

      <DeleteActorModal 
       onClose={onBackdropClick}
       isDeleteModalVisible={isDeleteModalVisible}
       onDeleteActor={onDeleteActor}
       deleteId={deleteId}
      />
      
    </div>
  )
}

export default ActorDashboard