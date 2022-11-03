import React, { useState } from 'react'
import ModalRWD from './ModalRWD';

import {ReactComponent as LoginIcon} from '../../images/user.svg'
import {ReactComponent as PasswordIcon} from '../../images/padlock.svg'
import InputWithIcon from './InputWithIcon';
import {  Button, ButtonContainer, Error } from './ModalPopup.styled'

interface LoginArgs {
  email:string;
  password: string;
}

export type LoginFunction = ( args: LoginArgs) => Promise<void>;

interface LoginModalProps{
  onClose : () => void;
  isModalVisible: boolean;
  loginError?: string
  onLoginRequested:  LoginFunction;
}

const LoginModal : React.FC<LoginModalProps>= ({onClose, isModalVisible, loginError, onLoginRequested}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if(e.key === 'Enter'){
      onLoginRequested({email,password})
    }
  }
  return (
    <ModalRWD 
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      header="Login"
      message='Please log in'
      content = {
        <>
        <InputWithIcon 
        onKeyDown={onKeyDown}
        value={email}
        onChange={e => setEmail(e.target.value)}
        type='text' 
        icon={<LoginIcon  width='24px' height='24px' fill='white'/>} 
       
        />
        <InputWithIcon 
        onKeyDown={onKeyDown}
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='password'
        icon={<PasswordIcon width='24px' height='24px' fill='white'/>}
        />
        {loginError && <Error>{loginError}</Error>}
        <ButtonContainer>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onLoginRequested({email,password})}>Login</Button>
        </ButtonContainer>
        
        </>
      }
    />
  )
}

export default LoginModal