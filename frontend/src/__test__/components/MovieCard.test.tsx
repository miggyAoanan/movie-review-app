/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { movie } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";

import MovieCard from "../../components/MovieCard/MovieCard";


describe("<MovieCard />", () => {
  const initialState = {
    movie
  }
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieCard {...movie} />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("should render mock movie image", async () => {
    const imageElement: HTMLImageElement = screen.getByRole("img")
    expect(imageElement.alt).toEqual(movie.title);
    expect(imageElement).toBeInTheDocument()
  })

//   test("should navigate to individial movie page when clicked", () => {
//     const history = createMemoryHistory();
//     render(
//       <Router location={history.location} navigator={history}>
//         <MovieCard {...movie} />
//       </Router>
//     );
//     // const linkElement = screen.getByRole("link");
//     const links = screen.getAllByRole("link")

//     userEvent.click(links[0]);
//     console.log(links[0]);

//     expect(history.location.pathname).toEqual(
//       `/movie/${movie.id}`
//     );
//   });


})    