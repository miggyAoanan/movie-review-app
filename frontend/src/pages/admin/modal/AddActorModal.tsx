import React, { useState, useEffect, MouseEventHandler } from 'react'
import { RootState, useAppDispatch, useAppSelector } from "../../../store/store"
import { addActor, getActor, updateActor, deleteActor } from '../../../redux/actorSlice';
import { Actor } from "../../../interfaces"
import ActorModalRWD from '../../../components/Modal/ActorModalRWD';

//tested
export type DeleteActorFunction = (id: string) => Promise<void>;
//test update

export type UpdateActorFunction = (args: Actor) => Promise<void>;

interface AddActorModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  forUpdateId?: string;
  onUpdateActor: UpdateActorFunction;
  actorForUpdate?: Actor;
}

const AddActorModal: React.FC<AddActorModalProps> = ({ onClose, isModalVisible, forUpdateId, onUpdateActor, actorForUpdate }) => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] =  useState<string | undefined>("")
  const [lastName, setLastName] =  useState<string | undefined>("")
  const [gender, setGender] = useState<string | undefined>("")
  const [age, setAge] =  useState<number | undefined>(0)
  const [imageURL, setImageURL] =  useState<string | undefined>("")

  useEffect(() => {
    const initGetActor = async () => {
      await dispatch(getActor(forUpdateId))
    }
    initGetActor()
    const actor = { ...actorForUpdate } 
  
    setFirstName(actor.firstName)
    setLastName(actor.lastName)
    setGender(actor.gender)
    setAge(actor.age)
    setImageURL(actor.imageURL)


  }, [forUpdateId])

  const actor = useAppSelector((state: RootState) => state.actors.actor)


  useEffect(() => {

    console.log(actorForUpdate);
    console.log("hello");
  }, [])

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

    const actordData = { firstName, lastName, gender, age, imageURL }

    if (forUpdateId) {
      let data = {id:forUpdateId, ...actordData}
      onUpdateActor(data)
    } else {
      dispatch(addActor(actordData))
    }

    // if (firstName === "") {
    //   alert("Firstname is required")
    // } else if (lastName === "") {
    //   alert("Lastname is required")
    // } else if (gender === "") {
    //   alert("Gender is required")
    // } else if (age === null) {
    //   alert("Gender is required")
    // }else if (imageURL === "") {
    //   alert("imageURL is required")
    // } else {
    //   let age = Number(input.age)
    //   const actordData = { firstName, lastName, gender, age, imageURL }
    //   dispatch(addActor(actordData))
    // }

  }





  return (
    <ActorModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      forUpdateId={forUpdateId}
     
      content={
        <>

          <h2 className='fw-bold mb-2 text-uppercase text-white'>
            {!forUpdateId ?
              "Add Actor" : ""
            }
            {forUpdateId ? "Edit Actor" : ""}
          </h2>
          {!forUpdateId ?

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

              <button
                className="btn btn-light btn-lg px-5"
                type='button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </>
            : ""
          }

        

          
        </>
      }
    />
  )
}

export default AddActorModal