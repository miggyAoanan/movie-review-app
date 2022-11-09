import React, { useState } from 'react'
import {  useAppDispatch } from "../../../store/store"

import { Actor } from "../../../interfaces"
import ActorModalRWD from '../../../components/Modal/ActorModalRWD';

export type AddActorFunction = (args: Actor) => Promise<void>;
interface AddActorModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  error?: string;
  onAddActor: AddActorFunction;
}

const AddActorModal: React.FC<AddActorModalProps> = ({ onClose, isModalVisible, onAddActor, error }) => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    imageURL: ""

  });


  // const { firstName, lastName, gender, imageURL } = input;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <ActorModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}

      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'>Add Actor </h2>
          {error && (<p className='text-danger fs-6'>{error}</p>)}
            <>
              <div className='form-outline form-white mb-4'>
                <input
                  type="text"
                  placeholder="firstname"
                  id="firstName"
                  name="firstName"
                  className="form-control form-control-lg"
                  value={input.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className='form-outline form-white mb-4'>
                <input
                  type="text"
                  placeholder="lastname"
                  id="lastName"
                  name="lastName"
                  className="form-control form-control-lg"
                  value={input.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='d-flex flex-row'>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio" name="gender"
                    id="inlineRadio1"
                    value="male"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Male</label>

                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio2"
                    value="female"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" >Female</label>
                </div>
              </div>
              <div className='form-outline form-white mb-4'>
                <input
                  type="number"
                  placeholder="Age"
                  id="age"
                  name="age"
                  value={input.age}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <div className='form-outline form-white mb-4'>
                <input
                  type="text"
                  placeholder="Image URL"
                  id="imageURL"
                  name="imageURL"
                  value={input.imageURL}
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
              </div>
            
              <button
                className="btn btn-light btn-lg px-5"
                type='button'
                onClick={() => onAddActor({ ...input })}
              >
                Save
              </button>
            </>
    
          
        </>
      }
    />
  )
}

export default AddActorModal