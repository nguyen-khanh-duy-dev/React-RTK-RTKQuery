import { getCurrentUser } from "@/services/auth"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload // Gán dữ liệu từ API vào state
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.currentUser = null
            })
    },
})

console.log(authSlice)

export const { setCurrentUser } = authSlice.actions

export default authSlice.reducer
