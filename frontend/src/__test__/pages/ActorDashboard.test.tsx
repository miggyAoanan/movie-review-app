/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, getByRole, render, screen, within,cleanup } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { actorList, movieList } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import UserDashBoard from "../../pages/admin/UserDashBoard";
import {User} from '../../interfaces'
import userIcon from '../../images/user.png'
import ActorDashboard from "../../pages/admin/ActorDashboard";


describe("<ActorDashboard />", () => {
    const initialState = {
        actors: actorList,
        movies: movieList
    }
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <ActorDashboard />
                </BrowserRouter>
            </Provider>
        );
    };

    afterEach(cleanup);

    test("renders the Actor Dashboard page with heading Actor List", () => {
        renderApp();
        expect(screen.getByText("Actor List")).not.toBeNull();
    });


    test("should Add button element present ", async () => {
        renderApp();
        const addActorElement = screen.getByRole("button",{
            name: "Add"
        })
        expect(addActorElement).toBeInTheDocument()

    })

    


})