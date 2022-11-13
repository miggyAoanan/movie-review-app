import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import '../../admin/Dash.scss'



export type UpdateFunction = (args: {id: string |undefined, isActive: boolean |undefined}) => Promise<void>;

interface UpdateAdminModalProps {
  onClose: () => void;
  isEditModalVisible: boolean;
  UpdateAdminErrorInput?: string,
  onUpdateRequested: UpdateFunction;
  reviewId?: string
}

const UpdateReviewModal: React.FC<UpdateAdminModalProps> = ({ onClose, isEditModalVisible, UpdateAdminErrorInput, onUpdateRequested, reviewId }) => {

 
  const [isActive] = useState<boolean | undefined>(false)
  const [id, setId] = useState<string | undefined>("")

  useEffect(() => {
    if (reviewId) {  
      setId(reviewId)
    }
  }, [reviewId])

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>

           <h2 className='fw-bold mb-2 text-uppercase text-white'>Approve review?</h2>
           <button onClick={onClose}
                className="btn btn-light btn-lg px-5"
                type='button'
              > Cancel</button>


          <button
            className="btn btn-light btn-lg px-5"
            type='button'
           
            onClick={() => onUpdateRequested({id, isActive})}
          >
            Ok
          </button>

        </>
      }
    />
  )
}

export default UpdateReviewModal