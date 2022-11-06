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
  const [firstName, setFirstName] =  useState<string | undefined>("")
  const [lastName, setLastName] =  useState<string | undefined>("")
  const [gender, setGender] = useState<string | undefined>("")
  const [age, setAge] =  useState<number | undefined>(0)
  const [imageURL, setImageURL] =  useState<string | undefined>("")

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
    const actordData = { id,firstName, lastName, gender, age, imageURL }
    // const actordData = { firstName, lastName, gender, age, imageURL }
    // let data = {id, ...actordData}
    onUpdateActor(actordData)
    console.log(actordData)
  }

  return (
    <ActorModalRWD
      header='Edit Actor'
      onBackdropClick={onClose}
      isEditModalVisible={isEditModalVisible}
      content={
        <>

          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="firstname"
              id="firstName"
              name="firstName"
              className="form-control form-control-lg"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="lastname"
              id="lastName"
              name="lastName"
              className="form-control form-control-lg"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className='d-flex flex-row'>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio" name="gender"
                id="inlineRadio1"
                value="male"
                onChange={handleGenderChange}
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
                onChange={handleGenderChange}
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
              value={age}
              onChange={handleAgeChange}
              className="form-control form-control-lg"
            />
          </div>

          <div className='form-outline form-white mb-4'>
            <input
              type="text"
              placeholder="Image URL"
              id="imageURL"
              name="imageURL"
              value={imageURL}
              className="form-control form-control-lg"
              onChange={handleImageChange}
            />
          </div>
          <ButtonContainer>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            {/* <Button onClick={() => onUpdateActor({ ...input })}>Add</Button> */}
          </ButtonContainer>

        </>
      }
    />
  )
}

export default UpdateActorModal