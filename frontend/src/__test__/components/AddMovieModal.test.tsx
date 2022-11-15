/* eslint-disable testing-library/no-render-in-setup */
import { getByText, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { movieList, actorList, movie } from "../../utils/db.mocks"
import thunk from "redux-thunk";




import MovieDashboard from "../../pages/admin/MovieDashboard";

describe("<AddMovieModal />", () => {
    const initialState = {
        movies: movieList,
        actors: actorList,
        movie
    }
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    let isModalVisible = true

    const onBackdropClick = () => {
        isModalVisible = false

    }
    type AddMovieFunction = () => Promise<void>;
    const onAddMovie: AddMovieFunction = async () => {
    }

    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <MovieDashboard />
                </BrowserRouter>
            </Provider>
        );
    };

    test("should render 'Add Movie Modal' if  'Add movie' button is clicked ", async () => {

        renderApp();

        const addMovieBtnElement = screen.getByRole("button", {
            name:"Add"
        })
        expect(addMovieBtnElement).toBeInTheDocument()
       
        
    })


})    