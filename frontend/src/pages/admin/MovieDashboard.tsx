import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, Rootstate } from '../../store/store'
import { getMovies, addMovie } from "../../redux/movieSlice";


import Table from "../../components/Table/Table";
import AddMovieModal, { AddMovieFunction } from "../../components/Modal/AddMovieModal";
import { Movie } from "../../interfaces/movie"

const MovieDashboard = () => {

  const movies = useAppSelector((state: Rootstate) => state.movies.movies)
  const moviesState = useAppSelector((state: Rootstate) => state.movies)
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getMovies());
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  let renderMovieDetails
  renderMovieDetails =
    moviesState.getMovieStatus == "fullfilled" ?
      movies?.map((movie, index) => (<Table key={index} {...movie} />)) :
      (
        <div className="movies-error">
          <h3>{moviesState.errors}</h3>
        </div>
      );


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
    const cost = Number( movieData.cost)
    const year = movieData.year
    const imageURL = movieData.imageURL

    let actorIds = []

    actorIds.push(movieData.actorIds)

    const saveMoviedata = {title, cost, year, imageURL, actorIds}
    
  
    if (title === "") {
      setError("title is required");
    } else if (year === "") {
      setError("Year is required");
    } else if (cost === null) {
      setError("Cost is required");
    }else if (imageURL === "") {
      setError("Year is required");
    }
    else if (actorIds.length === 0) {
      setError("Actor is required");
    }
    
    
    
    else {
      dispatch(addMovie({...saveMoviedata})).then((res) => {

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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {renderMovieDetails}
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