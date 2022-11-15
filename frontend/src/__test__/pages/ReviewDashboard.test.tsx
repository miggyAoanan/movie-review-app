/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, getByRole, render, screen, within } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { reviewList, review, movieList} from "../../utils/db.mocks"
import thunk from "redux-thunk";


import ReviewDashboard from "../../pages/admin/ReviewDashboard";



describe("<ReviewDashboard />", () => {
    const initialState = {
        review: review,
        reviews: reviewList,
        movies: movieList,

    }
    const mockStore = configureStore([thunk]);
    let store = mockStore(initialState);
    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <ReviewDashboard />
                </BrowserRouter>
            </Provider>
        );
    };

    beforeEach(() => renderApp());
    test("renders the Review Dashboard page with heading Review List", () => {
        expect(screen.getByText("Review List")).not.toBeNull();
    });

    

})