import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const provincesApi = createApi({
    reducerPath: "provincesApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => `/address/provinces`,
            transformResponse: (response) => response.data,
        }),
    }),
    refetchOnReconnect: true,
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvincesQuery } = provincesApi
