import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getActors, actorDetails, deleteActor, updateActor, addActor } from "../../redux/actorSlice"
import { getMovies } from "../../redux/movieSlice";

import { Actor } from '../../interfaces'
import AddActorModal, { AddActorFunction } from "./modal/AddActorModal";
import './Dash.scss'
import DeleteActorModal, { DeleteActorFunction } from "./modal/DeleteActorModal";
import UpdateActorModal, { UpdateActorFunction } from "./modal/UpdateActorModal";

import { toast, ToastContainer } from "react-toastify";

const ActorDashboard = () => {
  const actors = useAppSelector(actorDetails)
  const dispatch = useAppDispatch();
  const [error, setError] = useState("")
  const movies = useAppSelector((state: RootState) => state.movies.movies)
  const movieDetails = useMemo(() => movies, [movies])

  useEffect(() => {
    if (actors) {
      dispatch(getActors())
    }

  }, [dispatch])


  const [isModalVisible, setIsModalVisible] = useState(false)// add

  const [actorForUpdate, setActorForUpdate] = useState<Actor>()
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const toggleEditModal = () => {
    setEditModalVisible(wasEditModalVisible => !wasEditModalVisible)
  }

  //toggle add modal
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  //delete modal
  const [deleteId, setDeleteId] = useState<string>("")
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const toggleDeleteModal = () => {
    setDeleteModalVisible(wasDeleteModalVisible => !wasDeleteModalVisible)
  }

  useEffect(() => {
    if (deleteId) {
      dispatch(getMovies())
    }

  }, [dispatch])


  const onBackdropClick = () => {
    setIsModalVisible(false)
    setDeleteModalVisible(false)
    setEditModalVisible(false)


  }

  const onAddActor: AddActorFunction = async (args: Actor) => {

    let age = Number(args.age)
    const actorData: Actor = { firstName: args.firstName, lastName: args.lastName, age, gender: args.gender, imageURL: args.imageURL }
    if (args.firstName === "") {
      setError("First name is required")
    } else if (args.lastName === "") {
      setError("Last name is required")
    } else if (args.age === 0) {
      setError("Age cannot be 0")
    } else if (args.gender === "") {
      setError("Please choose a gender")
    } else if (args.imageURL === "") {
      setError("Please provide an image URL")
    } else {
      dispatch(addActor(actorData)).then((res: any) => {
        onBackdropClick()
        dispatch(getActors())
      })

    }

  }


  const onDeleteActor: DeleteActorFunction = async (id: string) => {
    let castedMovies = movieDetails?.filter(details => details?.actors?.some(actor => actor.id === id))
    if (castedMovies?.length !== 0) {
      toast.warning("Actor cannot be deleted as he is casted in a movie")
      onBackdropClick()
    } else {
      await dispatch(deleteActor(id)).then((res: any) => {
        toast.success(res.payload)
        dispatch(getActors())
        onBackdropClick()

      })

    }
 
  }


  const onUpdateActor: UpdateActorFunction = async (args: Actor) => {
    dispatch(updateActor(args)).then((res: any) => {
      dispatch(getActors())
      onBackdropClick()

    })

  }


  return (
    <div className="wrapper">
      <h2 className="h2 text-center text-white mb-5">Actor List</h2>
      <table className='table table-dark '>
        <thead>
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Actor Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            actors?.map((actor: Actor, index: number) => {
              return (
                <tr key={actor.id}>
                  <td>{index + 1}</td>
                  <td><img src={actor.imageURL} alt={actor.lastName} className='imageDash' /></td>
                  <td>{actor.firstName}&nbsp;{actor.lastName}</td>
                  <td>{actor.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm "
                      onClick={() =>{toggleEditModal();setActorForUpdate(actor)}}
                    >Edit</button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => { toggleDeleteModal(); setDeleteId(actor.id!)}}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary btn-sm px-5"

        onClick={() => { toggleModal() }}
      >Add</button>

      <AddActorModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onAddActor={onAddActor}
        error={error}
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
      <ToastContainer
        theme="dark" />
    </div>
  )
}

export default ActorDashboard