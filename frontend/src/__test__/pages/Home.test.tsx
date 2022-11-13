/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Home from "../../pages/home/Home";
import {actorList, movieList, movieDetails} from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";


describe("<Home />", () => {
  const initialState ={
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
          <Home />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the Home page with heading Movies", () => {
    expect(screen.getByText("Movies")).not.toBeNull();
  });

  test("renders the Home page with heading Actors", () => {
    expect(screen.getByText("Actors")).not.toBeNull();
  });

  

})