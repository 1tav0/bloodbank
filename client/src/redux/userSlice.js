import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
    },
    reducers: {
        SetCurrentUser(state, action) {
            state.currentUser = action.payload;
        }
    }
})

//so it can be available to use in all other components
export const { SetCurrentUser } = userSlice.actions // to export the function
export default userSlice.reducer; //to export the reducer 