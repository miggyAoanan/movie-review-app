import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getMovies, addMovie, deleteMovie, updateMovie } from "../../redux/movieSlice";
import './Dash.scss'

import AddMovieModal, { AddMovieFunction } from "./modal/AddMovieModal";
import { Movie } from "../../interfaces/movie"
import UpdateMovieModal, { UpdateMovieFunction } from "./modal/UpdateMovieModal";
import DeleteMovieModal, { DeleteMovieFunction } from "./modal/DeleteMovieModal";

const MovieDashboard = () => {

  const movies = useAppSelector((state: RootState) => state.movies.movies)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movies) {
      dispatch(getMovies())
    }
  }, [dispatch])

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
  const [deleteMovieId, setDeleteMovieId] = useState<string| undefined>("")
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const toggleDeleteModal = () => {
    setDeleteModalVisible(isDeleteModalVisible => !isDeleteModalVisible)
  }



  const onAddMovie: AddMovieFunction = async (args: Movie) => {

    console.log(args);
    const movieData = { ...args }
    const title = movieData.title   
    const overview = movieData.overview
    const cost = Number(movieData.cost)
    const year = movieData.year
    const imageURL = movieData.imageURL
    const actorIds = args.actorIds

    // actorIds.push(movieData.actorIds)

    const saveMoviedata = { title, overview, cost, year, imageURL, actorIds }


    if (title === "") {
      setError("title is required");
    } else if (year === "") {
      setError("Year is required");
    } else if (cost === 0) {
      setError("Cost cannot be 0");
    } else if (imageURL === "") {
      setError("Image is required");
    }
    else if (actorIds?.length === 0) {
      setError("Actor is required");
    }
    else {
      dispatch(addMovie({ ...saveMoviedata })).then((res:any) => {
         
          dispatch(getMovies())
      })
      
    }
  }

  const onUpdateMovie: UpdateMovieFunction = async (args: Movie) => {
   
    dispatch(updateMovie(args)).then((res:any) => {
      dispatch(getMovies())
    })


  }

  const onDeleteMovie: DeleteMovieFunction = async (id: string) => {
   
    dispatch(deleteMovie(id)).then((res:any) => {
      dispatch(getMovies())
    })
  }


  return (
    <div className="wrapper">
      <h2 className="h2 text-center text-white mb-5">Movie List </h2>
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Year</th>
            <th scope="col">Cost</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>

          {
            movies ? (
              movies.map((movie:Movie, index: number) => {
                return (

                  <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td><img src={movie.imageURL} alt={movie.title} className='imageDash' /></td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.cost}</td>
                    <td>

                      <div className="d-grid gap-2 d-md-block">

                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => { toggleEditModal(); setMovieDataforUpdate(movie) }}
                        >Edit</button>
                        &nbsp;
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => { toggleDeleteModal(); setDeleteMovieId(movie.id) }}
                        >Delete</button>

                      </div>


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

      <button type="button" className="btn btn-primary btn-sm px-5" onClick={toggleModal}>Add</button>


      <AddMovieModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onAddMovie={onAddMovie}
        error={error}
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
        deleteMovieId={deleteMovieId}
        onDeleteMovie={onDeleteMovie}

      />
    </div>
  )
}

export default MovieDashboard