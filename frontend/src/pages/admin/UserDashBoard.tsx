import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { userDetails, getUsers, registerAdmin, updateUser, deleteUser } from "../../redux/userSlice";
import userIcon from "../../images/user.png"
import 'react-toastify/dist/ReactToastify.css';
import RegisterAdminModal, { RegisterFunction } from "./modal/RegisterAdminModal";
import UpdateUserModal, {UpdateFunction, UpdateArgs} from './modal/UpdateUserModal'
import { User } from "../../interfaces";
import DeleteUserModal, {DeleteUserFunction} from "./modal/DeleteUserModal";
import { toast,ToastContainer} from "react-toastify";

const UserDashBoard = () => {
  const users = useAppSelector(userDetails)
  const [errorInput, setErrorInput] = useState("")
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector((state: RootState) => state.users.registerStatus)
  const registerError = useAppSelector((state: RootState) => state.users.registerError)
  const updateStatus =  useAppSelector((state: RootState) => state.users.updateUserStatus)
  const updateError = useAppSelector((state: RootState) => state.users.updateError)

  useEffect(() => {
    if (users) {
      dispatch(getUsers())
    }
   
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
    const [deleteId, setDeleteId] = useState<string>("")
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
    const toggleDeleteModal = () => {
      setDeleteModalVisible(wasDeleteModalVisible => !wasDeleteModalVisible)
    }
  


  const onRegisterRequest: RegisterFunction = async (data) => {

    console.log(data);
    const { fullName, email, password} = data
     await dispatch(registerAdmin({fullName, email, password})).then((res)=> {
      if (registerStatus === "fullfilled") {
        toast.success("Registration successfull")
      }
     })
    

    
  }


  const onUpdateUser : UpdateFunction = async (args: UpdateArgs) => {
    dispatch(updateUser(args)).then((res:any)=>{
 
    if(res.payload === "Email is already taken"){
      toast.error("Email is already taken")
    }
     else{
      toast.success(res.payload)
     }
    })

  }

  const onDeleteUser : DeleteUserFunction = async (id: string) => {
   
      dispatch(deleteUser(id)).then((res:any) =>{
      dispatch(getUsers())
      onBackdropClick()
     const messsage :string = res.payload
      toast.error(messsage)
   
      // console.log(res.payload.message)
    })
  }
  useEffect(() => {
    if (registerStatus === "rejected") {
      toast.error(registerError)

    }
  }, [registerError])

  useEffect(() => {
    if (updateStatus === "rejected") {
      toast.error(updateError)

    }
  }, [updateError])



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
                  <td>{
                  user.isActive === true ? "Active" : "Inactive"
                 }</td>
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
       <ToastContainer
       theme="dark" />
    </div>
  )
}

export default UserDashBoard