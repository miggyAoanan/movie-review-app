import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'

import { Movie } from "../../../interfaces"

export type UpdateMovieFunction = (args: Movie) => Promise<void>;

interface UpdateMovieModalProps {
  onClose: () => void;
  isEditModalVisible: boolean;
  error?: string;
  onUpdateMovie: UpdateMovieFunction;
  movieDataforUpdate?: Movie
}

const UpdateMovieModal: React.FC<UpdateMovieModalProps> = ({ isEditModalVisible, onClose, error, onUpdateMovie, movieDataforUpdate }) => {
  const [id, setId] = useState<string | undefined>("")
  const [title, setTitle] = useState<string | undefined>("")
  const [overview, setOverview] = useState<string | undefined>("")
  const [cost, setCost] = useState<number | undefined>(0)
  const [year, setYear] = useState<string | undefined>("")
  const [imageURL, setImageURL] = useState<string | undefined>("")
  const [actorIds, setActorIds] = useState<string[] | string | undefined>()

  useEffect(() => {
    setId(movieDataforUpdate?.id)
    setTitle(movieDataforUpdate?.title)
    setTitle(movieDataforUpdate?.overview)
    setCost(movieDataforUpdate?.cost)
    setYear(movieDataforUpdate?.year)
    setImageURL(movieDataforUpdate?.imageURL)
    setActorIds(movieDataforUpdate?.actorIds)
  }, [movieDataforUpdate])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }

  const handleOverviewChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOverview(event.target.value)
  }


  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCost(Number(event.target.value))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setYear(event.target.value)
  }

  const handleImageURLChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImageURL(event.target.value)
  }

  const handleActorIdsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const array = []
    const data = event.target.value
    array.push(data)
    setActorIds(array)
  }


  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    const updateData = { id, title, cost, year, imageURL, actorIds }
    onUpdateMovie(updateData)

  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>
          <p className='fs-5 text-white'>Edit movie details</p>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Movie Title</span>
            <input
              type="text"
              name='title'
              placeholder='Movie title'
              onChange={handleTitleChange}
              value={title}
              className="form-control form-control-sm"
            />

          </div>

          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Movie Overview</span>
            <input
              type="text"
              name='title'
              placeholder='Movie overview'
              onChange={handleTitleChange}
              value={overview}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Year</span>
            <input
              type="text"
              placeholder='Year'
              name='year'
              onChange={handleYearChange}
              value={year}
              className="form-control form-control-sm"
            />
          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Cost</span>
            <input
              type="number"
              placeholder='Cost'
              name='cost'
              onChange={handleCostChange}
              value={cost}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Image URL</span>
            <input
              type="text"
              placeholder='image'
              name='imageURL'
              onChange={handleImageURLChange}
              value={imageURL}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Actors</span>
            <input type="text"
              placeholder='actors'
              name='actorIds'
              onChange={handleActorIdsChange}
              value={actorIds}
              className="form-control form-control-sm"
            />
          </div>

          <ButtonContainer>
            <button onClick={onClose}
             className="btn btn-light btn-sm px-5"
             >Cancel</button>
            <button onClick={handleSubmit}
            className="btn btn-primary btn-sm px-5"
            >Save</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default UpdateMovieModal