import React, { useEffect, useState } from 'react'
import ActorModalRWD from '../../../components/Modal/ActorModalRWD'
import { Button, ButtonContainer, Error } from '../../../components/Modal/ModalPopup.styled'

import { Actor } from "../../../interfaces"


export type UpdateActorFunction = (args: Actor) => Promise<void>;

interface UpdateActorModalProps {
  onClose: () => void;
  isEditModalVisible: boolean;
  error?: string;
  onUpdateActor: UpdateActorFunction;
  actorForUpdate?: Actor
}

const UpdateActorModal: React.FC<UpdateActorModalProps> = ({ isEditModalVisible, onClose, error, onUpdateActor, actorForUpdate }) => {

  const [id, setId] = useState<string | undefined>("")
  const [firstName, setFirstName] = useState<string | undefined>("")
  const [lastName, setLastName] = useState<string | undefined>("")
  const [gender, setGender] = useState<string | undefined>("")
  const [age, setAge] = useState<number | undefined>(0)
  const [imageURL, setImageURL] = useState<string | undefined>("")

  useEffect(() => {
    const actor = { ...actorForUpdate }
    setId(actor.id)
    setFirstName(actor.firstName)
    setLastName(actor.lastName)
    setGender(actor.gender)
    setAge(actor.age)
    setImageURL(actor.imageURL)
  }, [actorForUpdate])

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setLastName(event.target.value)
  }

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setAge(Number(event.target.value))
  }
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setGender(event.target.value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setImageURL(event.target.value)
  }



  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    const actordData = { id, firstName, lastName, gender, age, imageURL }
    // const actordData = { firstName, lastName, gender, age, imageURL }
    // let data = {id, ...actordData}
    onUpdateActor(actordData)
    console.log(actordData)
  }

  return (
    <ActorModalRWD
      // header='Edit Actor'
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>

          <p className='fs-5 text-white'>Update Actor details</p>

          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>First Name</span>
            <input
              type="text"
              placeholder="firstname"
              id="firstName"
              name="firstName"
              className="form-control form-control-sm"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>

          <div className='form-outline form-white mb-2'>
            <span className='fs-6 text-white'>Last Name</span>
            <input
              type="text"
              placeholder="lastname"
              id="lastName"
              name="lastName"
              className="form-control form-control-sm"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className='d-flex flex-row'>
            <div className="form-check form-check-inline">

              {gender === "male" ?

                <input
                  className="form-check-input"
                  type="radio" name="gender"
                  checked
                  id="inlineRadio1"
                  value="male"
                  onChange={handleGenderChange}

                /> :

                <input
                className="form-check-input "
                type="radio" name="gender"
                id="inlineRadio1"
                value="male"
                onChange={handleGenderChange}

              /> 
              
            }


              <span className='fs-6 text-white'>Male</span>
            </div>
            <div className="form-check form-check-inline ">
              {
                gender === "female" ? 
                <input
                className="form-check-input"
                checked
                type="radio"
                name="gender"
                id="inlineRadio2"
                value="female"
                onChange={handleGenderChange}
              />
              :

              <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="female"
              onChange={handleGenderChange}
            />
              }
             
              <span className='fs-6 text-white'>Female</span>
            </div>
          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Age</span>
            <input
              type="number"
              placeholder="Age"
              id="age"
              name="age"
              value={age}
              onChange={handleAgeChange}
              className="form-control form-control-sm"
            />
          </div>

          <div className='form-outline form-white '>
            <span className='fs-6 text-white'>Image URL</span>
            <input
              type="text"
              placeholder="Image URL"
              id="imageURL"
              name="imageURL"
              value={imageURL}
              className="form-control form-control-sm"
              onChange={handleImageChange}
            />
          </div>
          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
            >Cancel</button>
            <button onClick={handleSubmit}
              className="btn btn-primary btn-sm px-5"
            >Save</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default UpdateActorModal