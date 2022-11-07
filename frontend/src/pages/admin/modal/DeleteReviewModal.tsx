import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'


export type DeleteReviewFunction = (id: string) => Promise<void>;

interface DeleteMovieModalProps {
  onClose: () => void;
  isDeleteModalVisible: boolean;
  error?: string;
  onDeleteReview: DeleteReviewFunction;
  deleteId?: string;
}

const DeleteReviewModal: React.FC<DeleteMovieModalProps> = ({ isDeleteModalVisible, onClose, error, onDeleteReview, deleteId }) => {


  return (
    <ActorModalRWD
      header='Delete Movie'
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteId={deleteId}
      content={
        <>
          
          <h2 className='fw-bold mb-2 text-uppercase text-white'>Are you sure you want to delete?</h2>

              <button onClick={onClose}
                className="btn btn-light btn-lg px-5"
                type='button'
              > Cancel</button>

              <button onClick={() => { onDeleteReview(deleteId!) }}
                className="btn btn-danger btn-lg px-5"
                type='button'
              > Delete</button>

        </>
      }
    />
  )
}

export default DeleteReviewModal