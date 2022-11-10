import React from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'

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
      // header='Delete User ?'
      onBackdropClick={onClose}
      isDeleteModalVisible={isDeleteModalVisible}
      deleteId={deleteId}
      content={
        <>
          <p className='fs-5 text-white'>Delete User ?</p>
          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
              type='button'
            > Cancel</button>

            <button onClick={() => { onDeleteUser(deleteId!) }}
              className="btn btn-danger btn-sm px-5"
              type='button'
            > Delete</button>
          </ButtonContainer>
        


        </>
      }
    />
  )
}

export default DeleteUserModal