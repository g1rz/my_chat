import {createSlice} from "@reduxjs/toolkit";
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

            localStorage.setItem("AUTH_TOKEN", state.token);
        },
        removeUser: (state) => {
            state.email = null;
            state.userId = null;
            state.token = null;
            state.isActivated = false;

            localStorage.removeItem("AUTH_TOKEN");
        }
    },
    extraReducers: (builder) => {
        // builder.addMatcher(
        //     authApi.endpoints.refreshToken.matchFulfilled,
        //     (state, { payload }) => {
        //         state.email = payload.email;
        //         state.userId = payload.userId;
        //         state.token = payload.token;
        //         state.isActivated = payload.isActivated;
        //         console.log(payload)
        //     }
        // );
    },
})

export const { setUser, removeUser } = userSLice.actions;

export default userSLice.reducer;