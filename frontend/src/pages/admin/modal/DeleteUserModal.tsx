import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'


export type DeleteUserFunction = (id: string) => Promise<void>;

interface DeleteMovieModalProps {
  onClose: () => void;
  isDeleteModalVisible: boolean;
  error?: string;
  onDeleteUser: DeleteUserFunction;
  deleteId?: string;
}

const DeleteUserModal: React.FC<DeleteMovieModalProps> = ({ isDeleteModalVisible, onClose, error, onDeleteUser, deleteId }) => {


  return (
    <ActorModalRWD
      header='Delete User'
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

              <button onClick={() => { onDeleteUser(deleteId!) }}
                className="btn btn-danger btn-lg px-5"
                type='button'
              > Delete</button>

        </>
      }
    />
  )
}

export default DeleteUserModal