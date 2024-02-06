import {createSlice} from "@reduxjs/toolkit";

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
    }
})

export const { setUser, removeUser } = userSLice.actions;

export default userSLice.reducer;