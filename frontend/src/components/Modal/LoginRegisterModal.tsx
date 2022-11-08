import React, { useState } from 'react'
import ModalRWD from './ModalRWD';
import { useAppDispatch } from "../../store/store"
import { registerUser } from "../../redux/userSlice"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const LoginRegisterModal: React.FC<LoginModalProps> = ({ onClose, isModalVisible, loginErrorInput, onLoginRequested }) => {
  const dispatch = useAppDispatch();
  const [showRegister, setShowRegister] = useState(false)
  // const [errorInput, setErrorInput] = useState("")
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: ""
  });

  const { fullName, email, password, confirm } = input;
  // let error = loginErrorInput;
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
      toast.error("fullName is required");
    } else if (email === "") {
      toast.error("Email is required");
    } else if (password === "") {
      toast.error("Password is required");
    } else if (confirm === "") {
      toast.error("Confirm password is required");
    } else if (password !== confirm) {
      toast.error("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        toast.error("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };
        dispatch(registerUser(userData)).then((res: any) => {
          if (res.data) {
            console.log(res)
          }
          else {
            console.log(res)
            console.log(res.error.data.error.message);// if thre is a single error
            let errorMessage = res.error.data.error.message
            let errorName = res.error.data.error.name
            let error = errorName + ": " + errorMessage
            toast.error(error)
            let errorArray: any = []
            let errors: any = res.error.data.error.details
            errors.forEach((err: any) => {

              errorArray.push(err.message)
            })
            console.log(errorArray)

          }

        })

      }
    }
  }

  const clear = () => {
    input.fullName = ""
    input.email = ""
    input.password = ""
    input.confirm = ""
   
  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'> {!showRegister ? "Login" : "Register"}</h2>
          
          {showRegister && (

            <>
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


            </>

          )}

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
              placeholder="********"
              name="password"
              onChange={handleChange}
              value={input.password}
              className="form-control form-control-sm"
            />
          </div>


          {showRegister && (
            <div className='form-outline form-white mb-4'>
               <span className='fs-6 text-white'>Confirm password</span>
              <input
                type="password"
                placeholder="********"
                name="confirm"
                onChange={handleChange}
                value={input.confirm}
                className="form-control form-control-sm"
              />
            </div>

          )}
         

          {!showRegister ? (
            <button
            className="btn btn-light btn-sm px-5 mt-4"
              type='button'
              onClick={() => onLoginRequested({ email, password })}
            >
              Login
            </button>

          ) :
            (
              <button
              className="btn btn-light btn-sm px-5"
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
          <ToastContainer />
        </>
      }
    />
  )
}

export default LoginRegisterModal