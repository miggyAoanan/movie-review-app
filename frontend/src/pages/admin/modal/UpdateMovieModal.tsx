import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD'
import { Button, ButtonContainer, Error } from '../../../components/Modal/ModalPopup.styled'

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
  const [cost, setCost] = useState<number | undefined>(0)
  const [year, setYear] = useState<string | undefined>("")
  const [imageURL, setImageURL] = useState<string | undefined>("")
  const [actorIds, setActorIds] = useState<string[] | undefined>()


  useEffect(() => {
    setId(movieDataforUpdate?.id)
    setTitle(movieDataforUpdate?.title)
    setCost(movieDataforUpdate?.cost)
    setYear(movieDataforUpdate?.year)
    setImageURL(movieDataforUpdate?.imageURL)
    setActorIds(movieDataforUpdate?.actorIds)
  }, [movieDataforUpdate])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
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
    const data  = event.target.value
    array.push(data)
    setActorIds(array)
  }


  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()

    const updateData = {id, title, cost, year, imageURL, actorIds}
    // console.log(updateData)
    onUpdateMovie(updateData)
    
  }

  return (
    <ModalRWD
      header='Edit Movie'
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>
          <input
            type="text"
            name='title'
            placeholder='Movie title'
            onChange={handleTitleChange}
            value={title}
          />
          <input
            type="text"
            placeholder='Year'
            name='year'
            onChange={handleYearChange}
            value={year}
          />
          <input
            type="number"
            placeholder='Cost'
            name='cost'
            onChange={handleCostChange}
            value={cost}
          />
          <input
            type="text"
            placeholder='image'
            name='imageURL'
            onChange={handleImageURLChange}
            value={imageURL}
          />
          <input type="text"
            placeholder='actors'
            name='actorIds'
            onChange={handleActorIdsChange}
            value={actorIds}
          />
          <ButtonContainer>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            {/* <Button onClick={() => onUpdateMovie({ ...input })}>Add</Button> */}
          </ButtonContainer>

        </>
      }
    />
  )
}

export default UpdateMovieModal