import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getMovies, addMovie, deleteMovie, updateMovie } from "../../redux/movieSlice";
import './Dash.scss'

import AddMovieModal, { AddMovieFunction } from "./modal/AddMovieModal";
import { Movie } from "../../interfaces/movie"
import UpdateMovieModal ,{UpdateMovieFunction} from "./modal/UpdateMovieModal";
import DeleteMovieModal ,{DeleteMovieFunction} from "./modal/DeleteMovieModal";

const MovieDashboard = () => {

  const movies = useAppSelector((state: RootState) => state.movies.movies)
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getMovies()).then((res)=>{
      initApp()
    });
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState("")

  // this for update Movie
  const [movieDataforUpdate, setMovieDataforUpdate] = useState<Movie>()

  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
    setEditModalVisible(false)
    setDeleteModalVisible(false)
  }

  // update Modal
const [isEditModalVisible, setEditModalVisible] = useState(false)
const toggleEditModal = () => {
  setEditModalVisible(isEditModalVisible => !isEditModalVisible)
}

//delete modal
const [deleteMovieId, setDeleteMovieId] = useState("")
const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
const toggleDeleteModal = () => {
  setDeleteModalVisible(isDeleteModalVisible => !isDeleteModalVisible)
}



  const onAddMovie: AddMovieFunction = async (args: Movie) => {
    const movieData = { ...args }
    const title = movieData.title
    const cost = Number(movieData.cost)
    const year = movieData.year
    const imageURL = movieData.imageURL

    let actorIds = []

    actorIds.push(movieData.actorIds)

    const saveMoviedata = { title, cost, year, imageURL, actorIds }


    if (title === "") {
      setError("title is required");
    } else if (year === "") {
      setError("Year is required");
    } else if (cost === null) {
      setError("Cost is required");
    } else if (imageURL === "") {
      setError("Year is required");
    }
    else if (actorIds.length === 0) {
      setError("Actor is required");
    }
    else {
      dispatch(addMovie({ ...saveMoviedata })).then((res) => {

      })
      setError("")
    }
  }

  const onUpdateMovie : UpdateMovieFunction = async (args: Movie) => {
    console.log(args)
    dispatch(updateMovie(args)).then((res)=> {
      initApp()
    })

    
  }

  const onDeleteMovie : DeleteMovieFunction = async (id: string) => {
    console.log(id)
    dispatch(deleteMovie(id)).then((res)=>{
      initApp()
    })
  }


  return (
    <div className="wrapper">
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Year</th>
            <th scope="col">Cost</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {
            movies ? (
              movies.map((movie, index) => {
                return (

                  <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.cost}</td>
                    <td><img src={movie.imageURL} alt={movie.title} className='imageDash' /></td>
                    <td>

                      <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={ () =>{toggleEditModal(); setMovieDataforUpdate(movie)}}
                      >Edit</button>
                      <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => {toggleDeleteModal(); setDeleteMovieId(movie.id!)} }
                      >Delete</button>

                    </td>
                  </tr>


                )
              })

            ) : (
              ""
            )
          }

        </tbody>
      </table>

      <button type="button" className="btn btn-primary" onClick={toggleModal}>Add</button>
      <AddMovieModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onAddMovie={onAddMovie}
      />

      <UpdateMovieModal
      onClose={onBackdropClick}
      isEditModalVisible={isEditModalVisible}
      onUpdateMovie={onUpdateMovie}
      movieDataforUpdate={movieDataforUpdate}
      />

      <DeleteMovieModal 
       onClose={onBackdropClick}
       isDeleteModalVisible={isDeleteModalVisible}
       deleteMovieId= {deleteMovieId}
       onDeleteMovie={onDeleteMovie}
      
      />
    </div>
  )
}

export default MovieDashboard