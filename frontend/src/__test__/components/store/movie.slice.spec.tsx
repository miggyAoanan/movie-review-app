import reducer, {
    getMovie,
    getMovieActors,
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
    MovieState

} from '../../../redux/movieSlice'

import {
    movie, movieList, error
} from '../../../utils/db.mocks'

describe("Movie Slice ExtraReducers", () => {

    const initialState: MovieState = {
        movies: [],
        movie: null,
        loading: false,
        errors: "",
        getMovieStatus: "",
        getMovieActorsStatus: "",
        addMovieStatus: "",
        updateMovieStatus: "",
        deleteMovieStatus: "",
        searchMovieStatus: ""
    }

    describe("addMovie", () => {
        it("fullfilled", () => {
            const action = { type: addMovie.fulfilled.type, payload: movie };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: movie,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "fullfilled",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: addMovie.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "rejected",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

        it("pending", () => {
            const action = { type: addMovie.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "pending",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

    })

    describe("deleteMovie", () => {
        it("fullfilled", () => {
            const action = { type: deleteMovie.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "fullfilled",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: deleteMovie.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "rejected",
                searchMovieStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: deleteMovie.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "pending",
                searchMovieStatus: ""
            });
        });

    })
    describe("updateMovie", () => {
        it("fullfilled", () => {
            const action = { type: updateMovie.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "fullfilled",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: updateMovie.rejected.type , payload:error};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: JSON.stringify(error),
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "rejected",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: updateMovie.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "pending",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

    })
    describe("getMovie", () => {
        it("fullfilled", () => {
            const action = { type: getMovie.fulfilled.type, payload: movie };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: movie,
                loading: false,
                errors: "",
                getMovieStatus: "fullfilled",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getMovie.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "pending",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getMovie.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "rejected",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

    })

    describe("getMovies", () => {
        it("fullfilled", () => {
            const action = { type: getMovies.fulfilled.type, payload: movieList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: movieList,
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "fullfilled",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getMovies.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "rejected",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getMovies.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "pending",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

    })

    describe("searchMovies", () => {
        it("fullfilled", () => {
            const action = { type: searchMovies.fulfilled.type, payload: movieList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: movieList,
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: "fullfilled"
            });
        });
        it("rejected", () => {
            const action = { type: searchMovies.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: "rejected"
            });
        });
        it("pending", () => {
            const action = { type: searchMovies.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: "pending"
            });
        });

    })

    describe("getMovieActors", () => {
        it("fullfilled", () => {
            const action = { type: getMovieActors.fulfilled.type, payload: movie };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: movie,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "fullfilled",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getMovieActors.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: true,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "pending",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getMovieActors.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                movies: [],
                movie: null,
                loading: false,
                errors: "",
                getMovieStatus: "",
                getMovieActorsStatus: "rejected",
                addMovieStatus: "",
                updateMovieStatus: "",
                deleteMovieStatus: "",
                searchMovieStatus: ""
            });
        });

    })
})