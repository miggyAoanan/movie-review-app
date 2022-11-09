import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'

export type UpdateMovieFunction = (args: UpdateArgs) => Promise<void>;

export interface UpdateArgs {
  id:string | undefined;
  cost:number | undefined;
  imageURL: string |undefined;
}

interface UpdateMovieModalProps {
  onClose: () => void;
  isEditModalVisible: boolean;
  error?: string;
  onUpdateMovie: UpdateMovieFunction;
  movieDataforUpdate?: UpdateArgs;
}

const UpdateMovieModal: React.FC<UpdateMovieModalProps> = ({ isEditModalVisible, onClose, error, onUpdateMovie, movieDataforUpdate }) => {
  const [id, setId] = useState<string | undefined>("")
   const [cost, setCost] = useState<number | undefined>(0)
  const [imageURL, setImageURL] = useState<string | undefined>("")


  useEffect(() => {
    setId(movieDataforUpdate?.id)
    setCost(movieDataforUpdate?.cost)
    setImageURL(movieDataforUpdate?.imageURL)

  }, [movieDataforUpdate])


  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCost(Number(event.target.value))
  }


  const handleImageURLChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImageURL(event.target.value)
  }

 

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    const updateData = { id, cost, imageURL }
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