import Header from "@/conponents/Header"
import { Outlet } from "react-router"

function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default DefaultLayout
