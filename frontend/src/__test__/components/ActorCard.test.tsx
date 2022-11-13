/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { actor } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import ActorCard from "../../components/ActorCard/ActorCard";


describe("<ActorCard />", () => {
  const initialState = {
    actor
  }
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ActorCard {...actor} />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("should render mock actor image", async () => {
    const imageElement: HTMLImageElement = screen.getByRole("img")
    expect(imageElement.alt).toEqual(actor.firstName);
    expect(imageElement).toBeInTheDocument()
  })

  // test("should navigate to individial actor page when clicked", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <Router location={history.location} navigator={history}>
  //       <ActorCard {...actor} />
  //     </Router>
  //   );
  //   const linkElement = screen.getByRole("link");
  //   userEvent.click(linkElement);

  //   expect(history.location.pathname).toEqual(
  //     `/actor/${actor.id}`
  //   );
  // });


})    