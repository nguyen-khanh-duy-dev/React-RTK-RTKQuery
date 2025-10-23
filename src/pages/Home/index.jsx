import { NavLink } from "react-router"

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <NavLink to="/products">Products</NavLink>
        </div>
    )
}

export default Home
