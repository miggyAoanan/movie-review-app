import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { userDetails, getUsers, registerAdmin, updateUser, deleteUser } from "../../redux/userSlice";

import userIcon from "../../images/user.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterAdminModal, { RegisterFunction, RegisterArgs } from "./modal/RegisterAdminModal";
import UpdateUserModal, {UpdateFunction, UpdateArgs} from './modal/UpdateUserModal'
import { User } from "../../interfaces";
import DeleteUserModal, {DeleteUserFunction} from "./modal/DeleteUserModal";

const UserDashBoard = () => {
  const users = useAppSelector(userDetails)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (users) {
      dispatch(getUsers())
    }
  }, [dispatch])

  const registerState = useAppSelector((state) => state.users)


  //Add Admin Modal
  const [forAdmin, setForAdmin] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)// add
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }
  const onBackdropClick = () => {
    setIsModalVisible(false)
    setIsEditModalVisible(false)
    setDeleteModalVisible(false)
  }

  //Update User Modal
  const [userForUpdate, setUserForUpdate] = useState<User>()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)// add
  const toggleEditModal = () => {
    setIsEditModalVisible(isEditModalVisible => !isEditModalVisible)
  }

    //delete modal
    const [deleteId, setDeleteId] = useState("")
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
    const toggleDeleteModal = () => {
      setDeleteModalVisible(isDeleteModalVisible => !isDeleteModalVisible)
    }
  


  const onRegisterRequest: RegisterFunction = async (args: RegisterArgs) => {
    console.log(args);
    const { fullName, email, password, confirm } = args;
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (fullName === "") {
      alert("fullName is required");
    } else if (email === "") {
      alert("Email is required");
    } else if (password === "") {
      alert("Password is required");
    } else if (confirm === "") {
      alert("Confirm password is required");
    } else if (password !== confirm) {
      alert("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        alert("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };
        dispatch(registerAdmin(userData)).then((res)=> {
          console.log(res)
        })

      }
    }
  }


  const onUpdateUser : UpdateFunction = async (args: UpdateArgs) => {

   const forUpdate = {id: args.id, fullName: args.fullName, email: args.email, isActive: args.isActive}
    dispatch(updateUser(args)).then((res)=>{
      dispatch(getUsers())
    })

  }

  const onDeleteUser : DeleteUserFunction = async (id: string) => {
   
    dispatch(deleteUser(id)).then((res)=>{
      dispatch(getUsers())
      onBackdropClick()
    })
  }


  return (
    <div className="wrapper">
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">Fullname</th>
            <th scope="col">Avatar</th>
            <th scope="col">Permission</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td> <img src={userIcon} alt="user" className='imageDash' /></td>
                  <td>{user.permissions}</td>
                  <td>{String(user.isActive)}</td>
                  <td>

                    <button
                      type="button"
                      className="btn btn-secondary"

                    onClick={() => { toggleEditModal(); setUserForUpdate(user)}}
                    >Edit</button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                    onClick={() => { toggleDeleteModal(); setDeleteId(user.id!)}}
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
        className="btn btn-primary"

        onClick={() => { setForAdmin("forAdmin"); toggleModal() }}
      >Register Admin</button>
      <RegisterAdminModal
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
        onRegisterRequested={onRegisterRequest}
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
      <ToastContainer />
    </div>
  )
}

export default UserDashBoard