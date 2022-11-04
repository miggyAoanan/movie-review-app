import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getMovies, addMovie } from "../../redux/movieSlice";
import './Dash.scss'

import AddMovieModal, { AddMovieFunction } from "../../components/Modal/AddMovieModal";
import { Movie } from "../../interfaces/movie"

const MovieDashboard = () => {

  const movies = useAppSelector((state: RootState) => state.movies.movies)
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getMovies());
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState("")
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
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

                      <button type="button" className="btn btn-secondary">Edit</button>
                      <button type="button" className="btn btn-danger">Delete</button>

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
    </div>
  )
}

export default MovieDashboard