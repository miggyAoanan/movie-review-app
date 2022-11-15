import reducer, {
    getReview,
    getReviews,
    addReview,
    updateReview,
    deleteReview,
    ReviewState

} from '../../../redux/reviewSlice'

import {
    review, reviewList, error
} from '../../../utils/db.mocks'

describe("Review Slice ExtraReducers", () => {

    const initialState: ReviewState = {
        review: null,
        reviews: [],
        loading: false,
        errors: "",
        getReviewStatus: "",
        addReviewStatus: "",
        addMovieReviewStatus:"",
        updateReviewStatus: "",
        deleteReviewStatus: ""
    }

   

    describe("deleteReview", () => {
        it("fullfilled", () => {
            const action = { type: deleteReview.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: "fullfilled"
            });
        });
        it("rejected", () => {
            const action = { type: deleteReview.rejected.type, payload: error };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: JSON.stringify(error),
                getReviewStatus: "",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: "rejected"
            });
        });
        it("pending", () => {
            const action = { type: deleteReview.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: true,
                errors: "",
                getReviewStatus: "",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: "pending"
            });
        });

    })
    describe("updateReview", () => {
        it("fullfilled", () => {
            const action = { type: updateReview.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "",
                addMovieReviewStatus:"",
                addReviewStatus: "",
                updateReviewStatus: "fullfilled",
                deleteReviewStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: updateReview.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "",
                addMovieReviewStatus:"",
                addReviewStatus: "",
                updateReviewStatus: "rejected",
                deleteReviewStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: updateReview.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: true,
                errors: "",
                getReviewStatus: "",
                addMovieReviewStatus:"",
                addReviewStatus: "",
                updateReviewStatus: "pending",
                deleteReviewStatus: ""
            });
        });

    })
    describe("getReview", () => {
        it("fullfilled", () => {
            const action = { type: getReview.fulfilled.type, payload: review };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: review,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "fullfilled",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getReview.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "rejected",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getReview.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: true,
                errors: "",
                getReviewStatus: "pending",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });

    })

    describe("getReviews", () => {
        it("fullfilled", () => {
            const action = { type: getReviews.fulfilled.type, payload: reviewList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: reviewList,
                loading: false,
                errors: "",
                getReviewStatus: "fullfilled",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getReviews.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "rejected",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getReviews.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: true,
                errors: "",
                getReviewStatus: "pending",
                addReviewStatus: "",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });

    })

    describe("addReview", () => {
        it("fullfilled", () => {
            const action = { type: addReview.fulfilled.type, payload: review };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: review,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "",
                addReviewStatus: "fullfilled",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: addReview.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: false,
                errors: "",
                getReviewStatus: "",
                addReviewStatus: "rejected",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: addReview.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                review: null,
                reviews: [],
                loading: true,
                errors: "",
                getReviewStatus: "",
                addReviewStatus: "pending",
                addMovieReviewStatus:"",
                updateReviewStatus: "",
                deleteReviewStatus: ""
            });
        });

    })

})