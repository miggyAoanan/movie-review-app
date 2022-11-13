/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";

import { user, users } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import Header from "../../components/Header/Header";

describe("<Header />", () => {

  const initialState = {
    user: user,
    users: users
  }
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("should render logo element", () => {
    const logoImgElement = screen.getByAltText("logo");
    expect(logoImgElement).toBeInTheDocument(); // Logo Image

  });

  test("Search Bar component", () => {
    const searchbar = screen.getByTestId("searchBar")
    expect(searchbar).toBeInTheDocument()

  });

  test("Search button submit component ", () => {
    const searchButton = screen.getByTestId("searchButton")
    expect(searchButton).toBeInTheDocument()

  });

  test("should render Navigation Links ", () => {
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(links[0].href).toContain("/")
    expect(links[1].textContent).toEqual("Home");
    expect(links[1].href).toContain("/")
    expect(links[2].textContent).toEqual("Movies");
    expect(links[2].href).toContain("/movie")
    expect(links[3].textContent).toEqual("Actors");
    expect(links[3].href).toContain("/actor")
  });





})