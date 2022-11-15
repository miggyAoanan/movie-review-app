/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";

import { users, authUser } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import Header from "../../components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Header />", () => {

  const initialState = {
    user: authUser,
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

  afterEach(cleanup);

  test("should render logo element", () => {
    renderApp();
    const logoImgElement = screen.getByAltText("logo");
    expect(logoImgElement).toBeInTheDocument(); // Logo Image

  });

  test("Search Bar component", () => {
    renderApp();
    const searchbar = screen.getByTestId("searchBar")
    expect(searchbar).toBeInTheDocument()

  });

  test("Search button submit component ", () => {
    renderApp();
    const searchButton = screen.getByTestId("searchButton")
    expect(searchButton).toBeInTheDocument()

  });

  test("should render Navigation Links ", () => {
    renderApp();
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(links[0].href).toContain("/")
    expect(links[1].textContent).toEqual("Home");
    expect(links[1].href).toContain("/")
    expect(links[2].textContent).toEqual("Movies");
    expect(links[2].href).toContain("/movie")
    expect(links[3].textContent).toEqual("Actors");
    expect(links[3].href).toContain("/actor")
  });

  test("should Login button element present ", async () => {
    renderApp();
    const loginElement = screen.getByRole("button", {
      name: "Login"
    })
    expect(loginElement).toBeInTheDocument()

  })



})



