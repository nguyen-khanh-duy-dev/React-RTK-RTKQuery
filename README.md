# Day 42 + 43: RTK, RTK Query, Login, Register, React hook form

1. RTK

````javascript
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Giả sử bạn dùng axios

// createAsyncThunk nhận 2 tham số:
// 1. Tên action: "tên_slice/tên_hành_động"
// 2. Hàm async thực thi việc gọi API
export const getProductList = createAsyncThunk(
    "product/getList",
    async () => {
        const response = await axios.get("https://api.example.com/products");
        return response.data; // Dữ liệu trả về sẽ vào action.payload
    }
); ```
````

### services/products/productService.js

-   Là nơi gọi bất đồng bộ api và trả về dữ liệu. Hãy coi phần này cuối cùng là một action bao gồm: action.type và action.payload

```javascript
import { createSlice } from "@reduxjs/toolkit"
import { getProductList } from "@/services/products/productService"

const initialState = {
    list: [],
    isLoading: false,
    error: null,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    // Dành cho các action đồng bộ (synchronous)
    reducers: {
        // ví dụ: setSort: (state, action) => { ... }
        // Xu ly cac action khi ko phai xu ly bat dong bo
    },
    // Dành cho các action bất đồng bộ (asynchronous) từ createAsyncThunk
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

// Export reducer để thêm vào store
export default productSlice.reducer
```

### features/products/productSlice.js

-   Tạo ra một Slice
-   extraReducer sẽ xử lý các action bất đồng bộ. Ở đây nó sẽ bắt trạng thái dữ liệu đang là gì: pending, fulfilled, rejected
-   reducer sẽ xử lý các action mà không cần xử lý bất đồng hộ

2. RTK Query

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => `/address/provinces`,
        }),
    }),
})

export const { useGetProvincesQuery } = addressApi
```

### features/provinces

-   Tạo ra một addressApi và tất cả mọi thứ sẽ được xử lý trong nó
-   Dữ liệu sẽ được trả ra ở useGetProvincesQuery

## Cấu hình store

1. Đối với RTK

-   Chỉ cần thêm reducer của nó vào RootReducer là xong

2. Đối với RTK QUERY

-   Cần thêm middleware của nó vào cái tổng rootReducer

```javascript
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

import { productSlice } from "@/features/products/productsSlice"
import { provincesApi } from "@/features/provinces"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "@/features/auth"

const rootReducer = combineReducers({
    [productSlice.reducerPath]: productSlice.reducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlewares) => [
        ...getDefaultMiddlewares({
            serializableCheck: false,
        }),
        provincesApi.middleware,
    ],
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
```

=> Trên đây là cấu trúc file store cho cả RTK và RTK query

=> Ở đây sử dụng cả redux-persist

-   Giúp lưu trữ các state của Redux store vào một nơi (localStorage với web)
-   Giúp lưu trữ state lại khi f5 lại trang
-   persistor sẽ được sử dụng ở main
