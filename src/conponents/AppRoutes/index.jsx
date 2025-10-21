import { BrowserRouter, HashRouter, Route, Routes } from "react-router"

import DefaultLayout from "@/layouts/DefaultLayout"
import AuthLayout from "@/layouts/AuthLayout"
import Home from "@/pages/Home"
import Products from "@/pages/Products"
import Login from "@/pages/Auth/Login"
import Register from "@/pages/Auth/Register"
import Provinces from "@/pages/Address/Provinces"
import AuthProvider from "../AuthProvider"
import PrivateRoute from "../PrivateRoute"
import Profile from "@/pages/Profile"

function AppRoutes() {
    return (
        <HashRouter>
            <AuthProvider />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/address/provinces" element={<Provinces />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
