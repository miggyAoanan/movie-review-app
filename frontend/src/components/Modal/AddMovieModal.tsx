import React, { useState } from 'react'
import ModalRWD from './ModalRWD';
import { Button, ButtonContainer, Error } from './ModalPopup.styled'

import { Movie } from "../../interfaces/movie"


export type AddMovieFunction = (args: Movie) => Promise<void>;

interface AddMovieModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  error?: string;
  onAddMovie: AddMovieFunction;

}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isModalVisible, onClose, error, onAddMovie }) => {

  const [input, setInput] = useState({
    title: "",
    year: "",
    cost: 0,
    imageURL: "",
    actorIds: []

  });

  const { title, year, cost, imageURL, actorIds } = input;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }




  return (
    <ModalRWD
      header='Add Movie'
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
          <input
            type="text"
            name='title'
            placeholder='Movie title'
            onChange={handleChange}
            value={input.title}
          />
          <input
            type="text"
            placeholder='Year'
            name='year'
            onChange={handleChange}
            value={input.year}
          />
          <input
            type="number"
            placeholder='Cost'
            name='cost'
            onChange={handleChange}
            value={input.cost}
          />
          <input
            type="text"
            placeholder='image'
            name='imageURL'
            onChange={handleChange}
            value={input.imageURL}
          />
          <input type="text"
            placeholder='actors'
            name='actorIds'
            onChange={handleChange}
            value={input.actorIds}
          />
          <ButtonContainer>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => onAddMovie({ ...input })}>Add</Button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default AddMovieModal