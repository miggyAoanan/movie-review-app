import reducer, {
    getUsers,
    registerAdmin,
    registerUser,
    updateUser,
    deleteUser,
    UserState

} from '../../../redux/userSlice'

import {
     userList, error
} from '../../../utils/db.mocks'

describe("User Slice ExtraReducers", () => {

    const initialState: UserState = {
        users: [],
        user: null,
        loading: false,
        errors: "",
        credential: null,
        getUsersStatus: "",
        registerStatus: "",
        registerError: "",
        deleteUserStatus: "",
        updateUserStatus: "",
        updateError: ""
    }

    describe("Register User", () => {
        it("fullfilled", () => {
            const action = { type: registerUser.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "fullfilled",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("rejected", () => {
            const action = { type: registerUser.rejected.type, payload: error };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "rejected",
                registerError: JSON.stringify(error),
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("pending", () => {
            const action = { type: registerUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: true,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "pending",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });

    })

    describe("Register Admin", () => {
        it("fullfilled", () => {
            const action = { type: registerAdmin.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "fullfilled",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });


        it("rejected", () => {
            const action = { type: registerAdmin.rejected.type, payload: error };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "rejected",
                registerError: JSON.stringify(error),
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("pending", () => {
            const action = { type: registerAdmin.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: true,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "pending",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });

    })
    describe("updateUser", () => {
        it("fullfilled", () => {
            const action = { type: updateUser.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "fullfilled",
                updateError: ""
            });
        });
        it("rejected", () => {
            const action = { type: updateUser.rejected.type, payload: error };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "rejected",
                updateError: JSON.stringify(error)
            });
        });
        it("pending", () => {
            const action = { type: updateUser.pending.type, payload: error };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: true,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "pending",
                updateError: ""
            });
        });

    })
    describe("getUsers", () => {
        it("fullfilled", () => {
            const action = { type: getUsers.fulfilled.type, payload: userList };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: userList,
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "fullfilled",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("rejected", () => {
            const action = { type: getUsers.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "rejected",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("pending", () => {
            const action = { type: getUsers.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: true,
                errors: "",
                credential: null,
                getUsersStatus: "pending",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "",
                updateUserStatus: "",
                updateError: ""
            });
        });

    })



    describe("deleteUser", () => {
        it("fullfilled", () => {
            const action = { type: deleteUser.fulfilled.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "fullfilled",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("rejected", () => {
            const action = { type: deleteUser.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: false,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "rejected",
                updateUserStatus: "",
                updateError: ""
            });
        });
        it("pending", () => {
            const action = { type: deleteUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                users: [],
                user: null,
                loading: true,
                errors: "",
                credential: null,
                getUsersStatus: "",
                registerStatus: "",
                registerError: "",
                deleteUserStatus: "pending",
                updateUserStatus: "",
                updateError: ""
            });
        });


    })
})