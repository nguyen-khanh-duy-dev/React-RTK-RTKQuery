import { setCurrentUser, useCurrentUser } from "@/features/auth"
import { NavLink, useNavigate } from "react-router"
import * as authService from "@/services/auth"
import { useDispatch } from "react-redux"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Lấy ra data ở đây chứ ko gọi api ở đây
    const currentUser = useCurrentUser()
    console.log(currentUser)

    const handleLogout = async () => {
        try {
            await authService.logout()
        } catch (error) {
            console.log(error)
        } finally {
            // Khi logout cần xóa cả localStorage.  và trong state. Trong state còn thì nó sẽ lấy ra được user hiện tại
            // Vì trong page login. Nếu có current user thì đá lại trang chủ
            localStorage.clear()
            dispatch(setCurrentUser(null))

            navigate("/login")
        }
    }

    return (
        <div>
            <h3>Header</h3>
            {currentUser ? (
                <div>
                    <p>{currentUser.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <NavLink to={"login"}>Sign in</NavLink>
                    <NavLink to={"register"}>Sign up</NavLink>
                </div>
            )}
        </div>
    )
}

export default Header
