import React, { useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import { useAppDispatch } from "../../../store/store"
import { registerAdmin } from "../../../redux/userSlice"


export interface RegisterArgs{
  fullName: string,
  email: string,
  password: string,
  confirm: string
}



export type RegisterFunction = (args:RegisterArgs ) => Promise<void>;


interface RegisterAdminModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  RegisterAdminErrorInput?: string,
  onRegisterRequested: RegisterFunction;
}

const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({ onClose, isModalVisible, RegisterAdminErrorInput, onRegisterRequested}) => {
  const dispatch = useAppDispatch();
  const [showRegister, setShowRegister] = useState(false)
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
  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    // eslint-disable-next-line
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (fullName === "") {
      alert("fullName is required");
    } else if (email === "") {
      alert("Email is required");
    } else if (password === "") {
      alert("Password is required");
    } else if (confirm === "") {
      alert("Confirm password is required");
    } else if (password !== confirm) {
      alert("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        alert("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };
        dispatch(registerAdmin(userData))

      }
    }
  }

  const clear = () => {
    input.fullName = ""
    input.email = ""
    input.password = ""
    input.confirm = ""
    error = ""
  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'> Register Admin</h2>
          <p className='text-white-50 mb-4 fs-6'>Please enter User details</p>
          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="Please enter fullname"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={input.fullName}
              className="form-control form-control-lg"
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="Please enter you email"
              name="email"
              onChange={handleChange}
              value={input.email}
              className="form-control form-control-lg"
            />
          </div>
          <div className='form-outline form-white mb-4'>
            <input
              type="password"
              placeholder="Please enter password"
              name="password"
              onChange={handleChange}
              value={input.password}
              className="form-control form-control-lg"
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <input
              type="password"
              placeholder="Please confirm password"
              name="confirm"
              onChange={handleChange}
              value={input.confirm}
              className="form-control form-control-lg"
            />
          </div>
          <button
            className="btn btn-light btn-lg px-5"
            type='button'
            // onClick={handleSubmit}
            onClick={() => onRegisterRequested({fullName, email, password, confirm })}
          >
            Register
          </button>

        </>
      }
    />
  )
}

export default RegisterAdminModal