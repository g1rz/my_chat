import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {authApi} from "@/redux/api/authApi.js";

const initialState = {
    email: null,
    userId: null,
    token: null,
    isActivated: false,
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.isActivated = action.payload.isActivated;
        },
        removeUser: (state) => {
            state.email = null;
            state.userId = null;
            state.token = null;
            state.isActivated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                authApi.endpoints.refreshToken.matchFulfilled,
                authApi.endpoints.registration.matchFulfilled,
                authApi.endpoints.login.matchFulfilled
            ), //updated
            (state, { payload }) => {
                state.email = payload.email;
                state.userId = payload.userId;
                state.token = payload.token;
                state.isActivated = payload.isActivated;
                console.log(payload, 'dasdad')
            }
        );
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.email = null;
                state.userId = null;
                state.token = null;
                state.isActivated = false;
            }
        );
    },
});

export const selectUser = state => state.user;

export const { setUser, removeUser } = userSLice.actions;

export default userSLice.reducer;