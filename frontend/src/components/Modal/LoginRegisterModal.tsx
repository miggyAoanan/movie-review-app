import React, { useState } from 'react'
import ModalRWD from './ModalRWD';
import { useAppDispatch, useAppSelector, RootState } from "../../store/store"
import { registerUser } from "../../redux/userSlice"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginArgs {
  email: string;
  password: string;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;

interface LoginModalProps {
  onClose: () => void;
  onClear: () => void;
  isModalVisible: boolean;
  loginErrorInput?: string
  onLoginRequested: LoginFunction;

}

const LoginRegisterModal: React.FC<LoginModalProps> = ({ onClose, onClear,isModalVisible, loginErrorInput, onLoginRequested }) => {

  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector((state: RootState) => state.users.getUsersStatus)
  const [showRegister, setShowRegister] = useState(false)
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: ""
  });

  const { fullName, email, password, confirm } = input;

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
      setError("Fullname is required");
    } else if (email === "") {
      setError("Email is required");
    } else if (password === "") {
      setError("Password is required");
    } else if (confirm === "") {
      setError("Confirm password is required");
    } else if (password !== confirm) {
      setError("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        setError("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };
        dispatch(registerUser(userData)).then((res: any) => {

          if (registerStatus === "fullfilled") {
            setMessage("Registration successfull")
          } else {

            console.log(res.error.data.error.message);
            let errorMessage = res.error.data.error.message
            let errorName = res.error.data.error.name
            let error = errorName + ": " + errorMessage
            setError(error)
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
    setError("")
   
  }
 


  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'> {!showRegister ? "Login" : "Register"}</h2>
          {
            error ? <p className='text-danger fs-6 error' >{error}</p>
              : ""
          }

          {
            message ? <p className='text-success fs-6 error' >{message}</p>
              : ""
          }

           {
            loginErrorInput ? <p className='text-danger fs-6 error' >{loginErrorInput}</p>
              : ""
          }

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
              onClick={() =>{ onLoginRequested({ email, password }) }}
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
                  onClick={() => { setShowRegister(true);clear();onClear() }}
                > Register</p>
              </>
            ) : (
              <>
                Already have an account?
                <p className='text-white mb-4 fs-6 text-center'
                  style={{ cursor: "pointer" }}
                  onClick={() => {setShowRegister(false);clear();onClear()}}
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