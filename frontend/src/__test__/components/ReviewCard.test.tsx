/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { review } from "../../utils/db.mocks"
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import ActorCard from "../../components/ActorCard/ActorCard";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";


describe("<ReviewCard />", () => {
  const initialState = {
    review
  }
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewCard {...review}/>
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("should render mock review description", async () => {
   
    const description = screen.getByTestId("description").innerHTML;
    expect(description).toEqual(review.description)
  })


  test("should render mock review rating", async () => {
   
    const rating = screen.getByTestId("rating").innerHTML;
    expect(rating).toEqual(review.rating+"/5")
  })

 


})    