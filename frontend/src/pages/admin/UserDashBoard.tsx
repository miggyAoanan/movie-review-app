import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { userDetails, getUsers, registerAdmin, updateUser, deleteUser } from "../../redux/userSlice";
import userIcon from "../../images/user.png"
import 'react-toastify/dist/ReactToastify.css';
import RegisterAdminModal, { RegisterFunction, RegisterArgs } from "./modal/RegisterAdminModal";
import UpdateUserModal, {UpdateFunction, UpdateArgs} from './modal/UpdateUserModal'
import { User } from "../../interfaces";
import DeleteUserModal, {DeleteUserFunction} from "./modal/DeleteUserModal";

const UserDashBoard = () => {
  const users = useAppSelector(userDetails)
  const [errorInput, setErrorInput] = useState("")
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (users) {
      dispatch(getUsers())
    }
  }, [dispatch])

  const registerState = useAppSelector((state) => state.users)
  useEffect(() => {
    
    console.log(registerState)

  }, [dispatch])

  const [isModalVisible, setIsModalVisible] = useState(false)// add
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }
  const onBackdropClick = () => {
    setIsModalVisible(false)
    setIsEditModalVisible(false)
    setDeleteModalVisible(false)
    clear()
  }

  //Update User Modal
  const [userForUpdate, setUserForUpdate] = useState<User>()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)// add
  const toggleEditModal = () => {
    setIsEditModalVisible(wasEditModalVisible => !wasEditModalVisible)
  }

    //delete modal
    const [deleteId, setDeleteId] = useState<string |undefined>("")
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
    const toggleDeleteModal = () => {
      setDeleteModalVisible(wasDeleteModalVisible => !wasDeleteModalVisible)
    }
  


  const onRegisterRequest: RegisterFunction = async (args: RegisterArgs) => {
    console.log(args);
    const { fullName, email, password, confirm } = args;
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (fullName === "") {
      setErrorInput("Fullname is required");
    } else if (email === "") {
      setErrorInput("Email is required");
    } else if (password === "") {
      setErrorInput("Password is required");
    } else if (confirm === "") {
      setErrorInput("Confirm password is required");
    } else if (password !== confirm) {
      setErrorInput("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        setErrorInput("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };
        dispatch(registerAdmin(userData)).then((res:any)=>{
          if (res.data) {
            console.log(res)
          }
          else {
            console.log(res)
            console.log(res.error.data.error.message);// if thre is a single error
            let errorMessage = res.error.data.error.message
            setErrorInput(errorMessage)
            let errorName = res.error.data.error.name
            let error = errorName + ": " + errorMessage
            setErrorInput(error)
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


  const onUpdateUser : UpdateFunction = async (args: UpdateArgs) => {
    dispatch(updateUser(args)).then((res:any)=>{
      dispatch(getUsers())
      onBackdropClick()
    })

  }

  const onDeleteUser : DeleteUserFunction = async (id: string) => {
   
    dispatch(deleteUser(id)).then((res:any)=>{
      dispatch(getUsers())
      onBackdropClick()
    })
  }

  const clear = () => {
   setDeleteId("")
   setErrorInput("")


  }

  return (
    <div className="wrapper">
      <h2 className="h2 text-center text-white mb-5">User List </h2>
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Fullname</th>  
            <th scope="col">Permission</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user: User, index:number) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>

                  <td> <img src={userIcon} alt="user" className='imageDash' /></td>
                  <td>{user.fullName}</td>                
                  <td>{user.permissions}</td>
                  <td>{String(user.isActive)}</td>
                  <td>

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm px-2"

                    onClick={() => { toggleEditModal(); setUserForUpdate(user)}}
                    >Edit</button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger btn-sm px-2"
                    onClick={() => { toggleDeleteModal(); setDeleteId(user.id)}}
                    >Delete</button>

                  </td>
                </tr>
              )
            })
          ) : ""}
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-primary btn-sm px-2" 

        onClick={() => { toggleModal() }}
      >Register Admin</button>
      <RegisterAdminModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onRegisterRequested={onRegisterRequest}
        RegisterAdminErrorInput={errorInput}
      />
      <UpdateUserModal
       onClose={onBackdropClick}
       isEditModalVisible={isEditModalVisible}
       onUpdateRequested={onUpdateUser}
       userForUpdate={userForUpdate}
      
      />
      <DeleteUserModal
       onClose={onBackdropClick}
       isDeleteModalVisible={isDeleteModalVisible}
       deleteId={deleteId}
       onDeleteUser={onDeleteUser}
      />
     
    </div>
  )
}

export default UserDashBoard