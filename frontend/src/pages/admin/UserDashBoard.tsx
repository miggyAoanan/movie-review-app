import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { userDetails, getUsers } from "../../redux/userSlice";

import userIcon from "../../images/user.png"

const UserDashBoard = () => {
    const users = useAppSelector(userDetails)
    const dispatch = useAppDispatch();
    const initApp = useCallback(async () => {
        await dispatch(getUsers()).then((res) => {
            initApp()
        })

    }, [dispatch])

    useEffect(() => {
        initApp()
    }, [initApp])


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
                  <td> <img src={userIcon} alt="user" className='imageDash'/></td>
                  <td>{user.permissions}</td>
                  <td>{String(user.isActive)}</td>
                  <td>

                    <button 
                    type="button" 
                    className="btn btn-secondary"
                  
                    // onClick={() => { toggleEditModal(); setActorForUpdate(actor)}}
                    >Edit</button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    // onClick={() => { toggleDeleteModal(); setDeleteId(actor.id!)}}
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
      
    //   onClick={() => { toggleModal()}}
      >Add</button>

      
    </div>
    )
}

export default UserDashBoard