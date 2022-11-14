import React, { useState, useEffect } from 'react'
import ModalRWD from './ModalRWD';
import { useAppDispatch, useAppSelector, RootState } from "../../store/store"
import { registerUser } from "../../redux/userSlice"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation } from '../../authServices/authApi'
import { setUser } from "../../redux/authSlice";


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface LoginArgs {
  email: string;
  password: string;
}

type LoginFunction = (args: LoginArgs) => Promise<void>;

interface LoginModalProps {
  onClose: () => void;
  isModalVisible: boolean;

}
type UserSubmitForm = {
  fullName: string;
  email: string;
  password: string;
  confirm: string;

};


const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Fullname is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirm: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),

});

const LoginRegisterModal: React.FC<LoginModalProps> = ({ onClose, isModalVisible }) => {

  const [loginUser, { data: loginData, isSuccess: isLoginSuccess}] = useLoginUserMutation()

  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector((state: RootState) => state.users.registerStatus)
  const registerError = useAppSelector((state: RootState) => state.users.registerError)
 
  const [showRegister, setShowRegister] = useState(false)

  const [email ,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onRegister = async (data: UserSubmitForm) => {
  
    await dispatch(registerUser({ fullName: data.fullName, email:data.email, password:data.password }))
  };

  const handleLogin: LoginFunction = async ({ email, password }) => {
    try {

      if (!email) {
        toast.warning("Email is required")
      } else if (!password) {
        toast.warning("Password is required")
      } else {
        await loginUser({email, password}).then((res: any) => {

          const messsage :string = res.error.data.error.message

          if (messsage ==="Invalid email or password.") {
           
            toast.error(messsage);
          }else{
            toast.info(messsage);
          }

        })

      }

    } catch (error: any) {
      // toast.error(error)

    }

  }

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("login successfull")
      dispatch(setUser({
        fullName: loginData.data.fullName,
        token: loginData.data.token,
        permissions: loginData.data.permissions,
        isActive: loginData.data.isActive,
        id: loginData.data.id
      }))
      onClose()
    }

  }, [isLoginSuccess])


  useEffect(() => {
    if (registerStatus === "fullfilled") {
      toast.success("Registration Successful")

    }
  }, [registerStatus])


  useEffect(() => {
    if (registerStatus === "rejected") {
      toast.error(registerError)

    }
  }, [registerError])


  const clear = () => {
  setEmail("")
  setPassword("")
  }



  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
          <div className="register-form">
            <form >
              <h2 className='fw-bold mb-2 text-uppercase text-white'> {!showRegister ? "Login" : "Register"}</h2>

              {showRegister && (
                <>


                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Full Name</label>
                    <input

                      type="text"
                      {...register('fullName')}
                      className={`form-control form-control-sm ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.fullName?.message}</div>
                  </div>

                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Email</label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>

                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Password</label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>

                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Confirm Password</label>
                    <input
                      type="password"
                      {...register('confirm')}
                      className={`form-control form-control-sm ${errors.confirm ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirm?.message}</div>
                  </div>


                </>

              )}

              {!showRegister && (
                <>
                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Email</label>
                    <input
                      type="text"
                      name='email'
                      onChange={(e) => {setEmail(e.target.value)}}
                      className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>

                  <div className='form-outline form-white'>
                    <label className='fs-6 text-white'>Password</label>
                    <input
                      name='password'
                      type="password"
                      onChange={(e) => {setPassword(e.target.value)}}
                      className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>
                </>

              )

              }



              {!showRegister ? (
                <div className='form-outline form-white d-flex justify-content-between mt-4'>
                  <button
                    className="btn btn-light"
                    type='button'
                    onClick={() => handleLogin({ email, password })}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-warning float-right"
                  >
                    Reset
                  </button>
                </div>


              ) :
                (
                  <div className='form-outline form-white d-flex justify-content-between mt-4'>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit(onRegister)}>
                      Register
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="btn btn-warning float-right"
                    >
                      Reset
                    </button>
                  </div>

                )
              }
              <h5 className="mt-5 fs-6 text-white-50">
                {!showRegister ? (
                  <>
                    Don't have an account ?

                    <p className='text-white mb-4 fs-6 text-center'
                      style={{ cursor: "pointer" }}
                      onClick={() => { setShowRegister(true) }}
                    > Register</p>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <p className='text-white mb-4 fs-6 text-center'
                      style={{ cursor: "pointer" }}
                      onClick={() => { setShowRegister(false); clear() }}
                    > Log in</p>
                  </>

                )}
              </h5>
              <ToastContainer
                theme="dark"
              />
            </form>
          </div>
        </>
      }
    />
  )
}

export default LoginRegisterModal