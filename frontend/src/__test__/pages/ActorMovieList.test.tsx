/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { actorList, movieList, movieDetails, actor } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";

import ActorMovieList from "../../components/Actor/ActorMovieList";


describe("<ActorMovieList />", () => {
    const initialState = {
        movies: movieList,
        actors: actorList,
        movieDetails: movieDetails
    }
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <ActorMovieList />
                </BrowserRouter>
            </Provider>
        );
    };

    beforeEach(() => renderApp());

    test("Check actor details", () => {
        let actorData = actor;
        const { container } = render(


            <div className="actorContainer">
                <img src={actorData?.imageURL} alt={actorData?.firstName} data-testid="img" />
                <h2 className="mt-2 text-white" data-testid="heading">{actorData?.firstName} {actorData?.lastName}</h2>
                <p className="text-white" data-testid="age">{actorData?.age}</p>
                <p className="text-white" data-testid="gender">{actorData?.gender}</p>

            </div>)
        const image: HTMLImageElement = screen.getByTestId("img")
        const heading = screen.getByTestId("heading")
        const ageElement = screen.getByTestId("age")
        const genderElement = screen.getByTestId("gender")
        expect(image.alt).toEqual(actor.firstName);
        expect(heading.textContent).toContain("Ryosuke Yamada")
        expect(Number(ageElement.textContent)).toEqual(actor.age)
        expect(genderElement.textContent).toEqual(actor.gender)
    });



})

