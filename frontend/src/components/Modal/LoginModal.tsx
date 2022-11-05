import React, { useState } from 'react'
import ModalRWD from './ModalRWD';
import { useAppDispatch } from "../../store/store"
import { registerUser } from "../../redux/userSlice"
interface LoginArgs {
  email: string;
  password: string;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;

interface LoginModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  loginErrorInput?: string
  onLoginRequested: LoginFunction;
  

}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, isModalVisible, loginErrorInput, onLoginRequested }) => {
  const dispatch = useAppDispatch();
  const [showRegister, setShowRegister] = useState(false)
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: ""
  });

  const { fullName, email, password, confirm } = input;
  let error = loginErrorInput;
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
        dispatch(registerUser(userData))

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

          <h2 className='fw-bold mb-2 text-uppercase text-white'> {!showRegister ? "Login" : "Register"}</h2>
          <p className='text-white-50 mb-4 fs-6'>
            {!showRegister ?
              "Please enter your Email & Password"
              : "Please enter User details"}
          </p>

          {showRegister && (

            <>
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


            </>

          )}

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


          {showRegister && (
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

          )}
          {!showRegister ? (

           error && <p className='text-danger fs-6'>{error}</p>


          ): ""}

          {!showRegister ? (
            <button
              className="btn btn-light btn-lg px-5"
              type='button'
              onClick={() => onLoginRequested({ email, password })}
            >
              Login
            </button>

          ) :
            (
              <button
                className="btn btn-light btn-lg px-5"
                type='button'
                onClick={handleSubmit}
              >
                Register
              </button>

            )
            
            }


          <h5 className="mt-5 fs-6 text-white-50">
            {!showRegister ? (
              <>
                Don't have an account ?

                <p className='text-white mb-4 fs-6 text-center'
                  style={{ cursor: "pointer" }}
                  onClick={() => { setShowRegister(true); clear() }}
                > Register</p>
              </>
            ) : (
              <>
                Already have an account?
                <p className='text-white mb-4 fs-6 text-center'
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRegister(false)}
                > Log in</p>
              </>

            )}
          </h5>

        </>
      }
    />
  )
}

export default LoginModal