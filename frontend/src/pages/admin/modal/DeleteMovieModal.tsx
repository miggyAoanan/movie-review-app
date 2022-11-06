import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD'


export type DeleteMovieFunction = (id: string) => Promise<void>;

interface DeleteMovieModalProps {
  onClose: () => void;
  isDeleteModalVisible: boolean;
  error?: string;
  onDeleteMovie: DeleteMovieFunction;
  deleteMovieId?: string;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ isDeleteModalVisible, onClose, error, onDeleteMovie, deleteMovieId }) => {

  // useEffect(() => {
    
  // }, [deleteMovieId])


  return (
    <ModalRWD
      header='Delete Movie'
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteMovieId={deleteMovieId}
      content={
        <>
          
          <h2 className='fw-bold mb-2 text-uppercase text-white'>Are you sure you want to delete?</h2>

              <button onClick={onClose}
                className="btn btn-light btn-lg px-5"
                type='button'
              > Cancel</button>




              <button onClick={() => { onDeleteMovie(deleteMovieId!) }}
                className="btn btn-danger btn-lg px-5"
                type='button'
              > Delete</button>

        </>
      }
    />
  )
}

export default DeleteMovieModal