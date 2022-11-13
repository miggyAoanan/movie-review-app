import React, { useState } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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



export type RegisterFunction = (args: UserSubmitForm) => Promise<void>;


interface RegisterAdminModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  RegisterAdminErrorInput?: string,
  onRegisterRequested: RegisterFunction;
}

const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({ onClose, isModalVisible, RegisterAdminErrorInput, onRegisterRequested }) => {

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });




  const onRegister = async (data: UserSubmitForm) => {
    onRegisterRequested(data)
  
  };


  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
          <div className="register-form">
            <form >
              <p className='fs-5 text-white'>Register Admin</p>
             
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

            </form>
          </div>
        </>
      }
    />
  )
}

export default RegisterAdminModal