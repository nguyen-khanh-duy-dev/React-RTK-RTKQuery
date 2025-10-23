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
    blacklist: [`${[productSlice.reducerPath]}`],
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
// Tạo 'persistor' từ store. Persistor chịu trách nhiệm
// thực thi quá trình persist (lưu) và rehydrate (phục hồi) state.
const persistor = persistStore(store)

// Kích hoạt các listeners của RTK Query (ví dụ: refetchOnFocus, refetchOnReconnect)
setupListeners(store.dispatch)

// Export store và persistor để sử dụng trong ứng dụng (thường là trong index.js)
export { store, persistor }

// Xử dụng persistor ở main
