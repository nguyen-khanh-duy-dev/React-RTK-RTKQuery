import { lazy } from "react"

import { HashRouter, Route, Routes } from "react-router"

// Code Splitting
// Không lazy code
import DefaultLayout from "@/layouts/DefaultLayout"
import AuthLayout from "@/layouts/AuthLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Auth/Login"
import Register from "@/pages/Auth/Register"
import Provinces from "@/pages/Address/Provinces"
import AuthProvider from "../AuthProvider"
import PrivateRoute from "../PrivateRoute"
import Profile from "@/pages/Profile"
import UseReducer from "@/pages/UseReducer"

// Lazy code
const Products = lazy(() => import("@/pages/Products"))

function AppRoutes() {
    return (
        <HashRouter>
            <AuthProvider />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/address/provinces" element={<Provinces />} />
                    <Route path="/use-reducer" element={<UseReducer />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Private Route */}
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
