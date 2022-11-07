import React, { useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import { Button, ButtonContainer, Error } from '../../../components/Modal/ModalPopup.styled'

import { Movie } from "../../../interfaces/movie"


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
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
            <p className='fs-5 text-white'>Please enter movie details</p>
          
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Movie Title</span>
            <input
              type="text"
              name='title'
              placeholder='Movie title'
              onChange={handleChange}
              value={input.title}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Year</span>
            <input
              type="text"
              placeholder='Year'
              name='year'
              onChange={handleChange}
              value={input.year}
              className="form-control form-control-sm"
            />
          </div>
          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Cost</span>
            <input
              type="number"
              placeholder='Cost'
              name='cost'
              onChange={handleChange}
              value={input.cost}
              className="form-control form-control-sm"
            />
          </div>

          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Image URL</span>
            <input
              type="text"
              placeholder='image'
              name='imageURL'
              onChange={handleChange}
              value={input.imageURL}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Actors</span>
            <input type="text"
              placeholder='actors'
              name='actorIds'
              onChange={handleChange}
              value={input.actorIds}
              className="form-control form-control-sm"
            />

          </div>


          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
            >Cancel</button>
            <button onClick={() => onAddMovie({ ...input })}
            
            className="btn btn-primary btn-sm px-5"
            >Add</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default AddMovieModal