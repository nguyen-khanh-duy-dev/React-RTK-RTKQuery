import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { Provider as ReduxProvider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import ErrorBoundary from "./conponents/ErrorBoundary.jsx"

createRoot(document.getElementById("root")).render(
    <ErrorBoundary>
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </ReduxProvider>
    </ErrorBoundary>
)
