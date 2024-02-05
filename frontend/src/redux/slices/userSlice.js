import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    userId: null,
    token: null,
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.email = null;
            state.userId = null;
            state.token = null;
        }
    }
})

export const { setUser, removeUser } = userSLice.actions;

export default userSLice.reducer;