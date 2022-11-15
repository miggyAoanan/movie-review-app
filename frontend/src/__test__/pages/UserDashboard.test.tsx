/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, getByRole, render, screen, within } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { userList } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import UserDashBoard from "../../pages/admin/UserDashBoard";
import {User} from '../../interfaces'
import userIcon from '../../images/user.png'


describe("<UserDashboard />", () => {
    const initialState = {
        users: userList
    }
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserDashBoard />
                </BrowserRouter>
            </Provider>
        );
    };

    beforeEach(() => renderApp());

    test("renders the User Dashboard page with heading User List", () => {
        expect(screen.getByText("User List")).not.toBeNull();
    });

    test("the values are in the table", () => {
        const userTable = () => {
            <table>
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
                    {
                        userList.map((user: User, index: number) => {
                            return (
                                <tr key={user.id} data-testid="userDash">
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
                                           
                                        >Edit</button>
                                        &nbsp;
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm px-2"
                                           
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        }
        const fullNameHeader = screen.getByText("Fullname");
        const PermissionHeader = screen.getByText("Permission");
        const StatusHeader = screen.getByText("Status");
        const tableRows = screen.getAllByRole("row");
        const columnheader = screen.getAllByRole("columnheader");
       

        expect(fullNameHeader).toBeInTheDocument()
        expect(PermissionHeader).toBeInTheDocument()
        expect(StatusHeader).toBeInTheDocument()
        expect(tableRows.length).toBe(1);
        expect(columnheader.length).toBe(6);
       
        
          

    });


})