import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'


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
      // header='Delete Actor ?'
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteId={deleteId}
      content={
        <>
          <p className='fs-5 text-white'>Delete Actor ?</p>

          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
              type='button'
            > Cancel</button>

            <button onClick={() => { onDeleteActor(deleteId!) }}
              className="btn btn-danger btn-sm px-5"
              type='button'
            > Delete</button>

          </ButtonContainer>



        </>
      }
    />
  )
}

export default DeleteActorModal