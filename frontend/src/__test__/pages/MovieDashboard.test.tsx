/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { movieList, actorList, movie } from "../../utils/db.mocks"
import thunk from "redux-thunk";



import MovieDashboard from "../../pages/admin/MovieDashboard";



describe("<MovieDashboard />", () => {
  const initialState = {
    movies: movieList,
    actors: actorList,
    movie
  }
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieDashboard />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the Movie Dashboard page with heading Movie List", () => {
    expect(screen.getByText("Movie List")).not.toBeNull();
  });

  test("Check movie details", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr key={movie.id}>
            <td><img src={movie.imageURL} alt={movie.title} className='imageDash' data-testid="img" /></td>
            <td data-testid="title">{movie.title}</td>
            <td data-testid="yearReleased">{movie.yearReleased}</td>
            <td data-testid="cost">{movie.cost}</td>
            <td>
              <span className="d-grid gap-2 d-md-block">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                >Edit</button>
                &nbsp;
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                >Delete</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

    )

    const img: HTMLImageElement = screen.getByTestId("img")
    const title = screen.getByTestId("title")
    const yearReleased = screen.getByTestId("yearReleased")
    const cost = screen.getByTestId("cost")
    expect(img.alt).toEqual(movie.title);
    expect(img).toBeInTheDocument()
    expect(title.textContent).toEqual(movie.title);
    expect(Number(yearReleased.textContent)).toEqual(movie.yearReleased);
    expect(Number(cost.textContent)).toEqual(movie.cost);

  })



})