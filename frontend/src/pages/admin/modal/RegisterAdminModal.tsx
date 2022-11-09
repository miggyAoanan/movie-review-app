import React, { useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import { useAppDispatch } from "../../../store/store"

export interface RegisterArgs {
  fullName: string,
  email: string,
  password: string,
  confirm: string
}

export type RegisterFunction = (args: RegisterArgs) => Promise<void>;


interface RegisterAdminModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  RegisterAdminErrorInput?: string,
  onRegisterRequested: RegisterFunction;
}

const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({ onClose, isModalVisible, RegisterAdminErrorInput, onRegisterRequested }) => {
  const dispatch = useAppDispatch();
  const [errorInput, setErrorInput] = useState("")
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: ""
  });

  const { fullName, email, password, confirm } = input;
  let error = RegisterAdminErrorInput;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  }


  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>

          <p className='fs-5 text-white'>Register Admin</p>
          {
            error? <p className='text-danger fs-6'>{error}</p>
            : ""
          }

          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Full Name</span>
            <input
              type="text"
              placeholder="Please enter fullname"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={input.fullName}
              className="form-control form-control-sm"
            />
          </div>

          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Email</span>
            <input
              type="text"
              placeholder="Please enter you email"
              name="email"
              onChange={handleChange}
              value={input.email}
              className="form-control form-control-sm"
            />
          </div>
          <div className='form-outline form-white'>
          <span className='fs-6 text-white'>Password</span>
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={handleChange}
              value={input.password}
              className="form-control form-control-sm"
            />
          </div>

          <div className='form-outline form-white mb-4'>
          <span className='fs-6 text-white'>Confirm Password</span>
            <input
              type="password"
              placeholder="*********"
              name="confirm"
              onChange={handleChange}
              value={input.confirm}
              className="form-control form-control-sm"
            />
          </div>

          <button
            className="btn btn-primary btn-sm px-5"
            type='button'

            onClick={() => onRegisterRequested({ fullName, email, password, confirm })}
          >
            Register
          </button>

        </>
      }
    />
  )
}

export default RegisterAdminModal