import reducer, {
    AuthState,
    setUser,
    logout

} from '../../../redux/authSlice'

import {
    authUser
} from '../../../utils/db.mocks'

describe("Actor Slice ExtraReducers", () => {

    const initialState: AuthState = {
        fullName: null,
        token: null,
        permissions: null,
        isActive: null,
        id: null,
    }

    describe("setUser", () => {
        it("fullfilled", () => {
            const action = { type: setUser.type, payload: authUser };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                fullName: authUser.fullName,
                token: authUser.token,
                permissions: authUser.permissions,
                isActive: authUser.isActive,
                id: authUser.id
            });
        });
       

    })

    describe("logout", () => {
        it("fullfilled", () => {
            const action = { type: logout.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                fullName: null,
                token: null,
                permissions: null,
                isActive: null,
                id: null
            });
        });
       

    })

    
})