import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'

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
      // header='Delete Review ?'
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteId={deleteId}
      content={
        <>
          <p className='fs-5 text-white'>Delete Review ?</p>
          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-lg px-5"
              type='button'
            > Cancel</button>
            <button onClick={() => { onDeleteReview(deleteId!) }}
              className="btn btn-danger btn-lg px-5"
              type='button'
            > Delete</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default DeleteReviewModal