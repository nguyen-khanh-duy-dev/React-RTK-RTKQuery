import { getList as getProductList } from "@/services/products"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    isLoading: false,
    error: null,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = action.payload // Gán dữ liệu từ API vào state
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default productSlice.reducer
