/* eslint-disable testing-library/no-render-in-setup */
import { getByText, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { actor, users } from "../../utils/db.mocks"
import thunk from "redux-thunk";

import LoginRegisterModal from "../../components/Modal/LoginRegisterModal";
import { useLoginUserMutation } from '../../authServices/authApi'

describe("<LoginRegisterModal />", () => {
    const initialState = {
        useLoginUserMutation,
        users

    }

    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    let isModalVisible = true
    const onBackdropClick = () => {
        isModalVisible = false

    }

    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginRegisterModal onClose={onBackdropClick}
                        isModalVisible={isModalVisible} />
                </BrowserRouter>
            </Provider>
        );
    };


    test(" useState setSate is called", () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const root = document.getElementById('modal-root');
        if (root) {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <LoginRegisterModal onClose={onBackdropClick}
                            isModalVisible={isModalVisible} />
                    </BrowserRouter>
                </Provider>
            )

        }


    
    })



})    