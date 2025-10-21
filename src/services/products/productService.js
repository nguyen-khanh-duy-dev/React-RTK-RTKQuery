import { http } from "@/utils/http"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getList = createAsyncThunk("product/getList", async () => {
    const response = await http.get("/products")

    return response.data
})
