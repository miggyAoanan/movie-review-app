import React from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'

export type DeleteMovieFunction = (id: string) => Promise<void>;

interface DeleteMovieModalProps {
  onClose: () => void;
  isDeleteModalVisible: boolean;
  error?: string;
  onDeleteMovie: DeleteMovieFunction;
  deleteMovieId?: string;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ isDeleteModalVisible, onClose, error, onDeleteMovie, deleteMovieId }) => {

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteMovieId={deleteMovieId}
      content={
        <>
         <p className='fs-5 text-white'>Delete Movie ?</p>
                   
          <ButtonContainer>
          <button onClick={onClose}
                className="btn btn-light btn-sm px-5"
                type='button'
              > Cancel</button>

              <button onClick={() => { onDeleteMovie(deleteMovieId!) }}
                className="btn btn-danger btn-sm px-5"
                type='button'
              > Delete</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default DeleteMovieModal