import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'


export type DeleteActorFunction = (id: string) => Promise<void>;

interface DeleteMovieModalProps {
  onClose: () => void;
  isDeleteModalVisible: boolean;
  error?: string;
  onDeleteActor: DeleteActorFunction;
  deleteId?: string;
}

const DeleteActorModal: React.FC<DeleteMovieModalProps> = ({ isDeleteModalVisible, onClose, error, onDeleteActor, deleteId }) => {


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

              <button onClick={() => { onDeleteActor(deleteId!) }}
                className="btn btn-danger btn-lg px-5"
                type='button'
              > Delete</button>

        </>
      }
    />
  )
}

export default DeleteActorModal