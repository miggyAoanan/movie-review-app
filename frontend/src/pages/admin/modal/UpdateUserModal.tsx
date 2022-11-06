import React, { useEffect, useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import { User } from '../../../interfaces';
import { useAppDispatch } from "../../../store/store"
import '../../admin/Dash.scss'


export interface UpdateArgs {
  id?: string,
  fullName: string | undefined,
  email: string | undefined,
  isActive: boolean | undefined
}



export type UpdateFunction = (args: UpdateArgs) => Promise<void>;

interface UpdateAdminModalProps {
  onClose: () => void;
  isEditModalVisible: boolean;
  UpdateAdminErrorInput?: string,
  onUpdateRequested: UpdateFunction;
  userForUpdate?: User
}

const UpdateUserModal: React.FC<UpdateAdminModalProps> = ({ onClose, isEditModalVisible, UpdateAdminErrorInput, onUpdateRequested, userForUpdate }) => {

  const [id, setId] = useState<string | undefined>("")
  const [fullName, setFullname] = useState<string | undefined>("")
  const [email, setEmail] = useState<string | undefined>("")
  const [isActive, setIsActive] = useState<boolean | undefined>(false)


  useEffect(() => {

    if (userForUpdate) {
      const userData = { ...userForUpdate }
      setId(userData.id)
      setFullname(userData.fullName)
      setEmail(userData.email)

      setIsActive(userData.isActive)


    }
  }, [userForUpdate])

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFullname(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }


  const handleisActiveChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value // false
    let newValue
    if (value === "false") {
      newValue = true
    }
    else {
      newValue = false
    }
    setIsActive(newValue)
  }


  return (
    <ModalRWD
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'> Update Admin</h2>
          <p className='text-white-50 mb-4 fs-6'>Please enter User details</p>
          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="Please enter fullname"
              id="fullName"
              name="fullName"
              onChange={handleFullNameChange}
              value={fullName}
              className="form-control form-control-lg"
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="Please enter you email"
              name="email"
              onChange={handleEmailChange}
              value={email}
              className="form-control form-control-lg"
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <label className="switch">
              <input type="checkbox"
                value={String(isActive)}
                onChange={handleisActiveChange}

              />
              <div className="slider"></div>
            </label>
          </div>

          <button
            className="btn btn-light btn-lg px-5"
            type='button'
            // onClick={handleSubmit}
            onClick={() => onUpdateRequested({id, fullName, email, isActive })}
          >
            Update
          </button>

        </>
      }
    />
  )
}

export default UpdateUserModal