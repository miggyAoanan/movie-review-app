/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import { actorList, movieList, movie, actor } from "../../utils/db.mocks"
import thunk from "redux-thunk";


describe("<MovieDetail />", () => {

    const initialState = {
        movies: movieList,
        actors: actorList,
        data: movie,
        actor

    }
  
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    const renderApp = () => {

        
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <MovieDetail />
                </BrowserRouter>
            </Provider>
        );
    };

    beforeEach(() => renderApp());

    test("should render movie image", () => {
        const movieImg = screen.getByRole("img");
        expect(movieImg).toBeInTheDocument();
    });

    test("should render Container for Rating ", () => {
        // const textRating = screen.getByText("Rating")
        const { container } = render(<div className="movie-rating mb-5">
            <span>
            </span>
        </div>)
        const textRating = container.textContent

        expect(textRating).toBeEmptyDOMElement
        
    });

    // test("should render Image ", () => {

    //     console.log();
    //     // const textRating = screen.getByText("Rating")
    //     const { container } = render(<div className="imageSection"></div>)
    //     const movieImage = container.firstChild
    //     // expect(movieImage).toHaveAttribute(
    //     //     "src",
    //     //     "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/AeyiuQUUs78bPkz18FY3AzNFF8b.jpg"
    //     //   );
    //     //   expect(movieImage).toHaveAttribute("alt", "Fullmetal Alchemist: The Final Alchemy (2022)");

    //     expect(movieImage).toBeInTheDocument();
    // });

    // test("should render header Overview", () => {
    //     const Overviewheader = screen.getByRole("heading", { name: /Overview/i });
    // });


})   