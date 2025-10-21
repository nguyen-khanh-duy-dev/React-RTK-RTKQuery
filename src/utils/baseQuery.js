import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    },
})

export default baseQuery
