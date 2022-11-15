import reducer, {
    getActor,
    getActors,
    addActor,
    deleteActor,
    searcheActors,
    updateActor,
    ActorState
} from '../../../redux/actorSlice'

import {
    actor,actorList
} from '../../../utils/db.mocks'

describe("Actor Slice ExtraReducers", () => {

    const initialState: ActorState = {
        actor: null,
        actors: [],
        loading: false,
        errors: "",
        getActorStatus: "",
        addActorStatus: "",
        updateActorStatus: "",
        deleteActorStatus: "",
        searchActorStatus: ""
    }

    describe("addActor", () => {
        it("fullfilled", () => {
            const action = { type: addActor.fulfilled.type , payload: actor};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: actor,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "fullfilled",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: addActor.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "",
                addActorStatus: "pending",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: addActor.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "rejected",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });

    })

    describe("deleteActor", () => {
        it("fullfilled", () => {
            const action = { type: deleteActor.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "fullfilled",
                searchActorStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: deleteActor.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "rejected",
                searchActorStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: deleteActor.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "pending",
                searchActorStatus: ""
            });
        });


    })
    describe("updateActor", () => {
        it("fullfilled", () => {
            const action = { type: updateActor.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "fullfilled",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: updateActor.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "pending",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: updateActor.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "rejected",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });

    })
    describe("getActor", () => {
        it("fullfilled", () => {
            const action = { type: getActor.fulfilled.type , payload: actor};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: actor,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "fullfilled",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getActor.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "pending",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getActor.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "rejected",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });


    })

    describe("getActors", () => {
        it("fullfilled", () => {
            const action = { type: getActors.fulfilled.type , payload: actorList};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: actorList,
                loading: false,
                errors: "",
                getActorStatus: "fullfilled",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("rejected", () => {
            const action = { type: getActors.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "rejected",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });
        it("pending", () => {
            const action = { type: getActors.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "pending",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: ""
            });
        });

    })

    describe("searchActors", () => {
        it("fullfilled", () => {
            const action = { type: searcheActors.fulfilled.type, payload: actorList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: actorList,
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: "fullfilled"
            });
        });
        it("rejected", () => {
            const action = { type: searcheActors.rejected.type, payload: actorList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: false,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: "rejected"
            });
        });
        it("pending", () => {
            const action = { type: searcheActors.pending.type, payload: actorList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                actor: null,
                actors: [],
                loading: true,
                errors: "",
                getActorStatus: "",
                addActorStatus: "",
                updateActorStatus: "",
                deleteActorStatus: "",
                searchActorStatus: "pending"
            });
        });

    })
})