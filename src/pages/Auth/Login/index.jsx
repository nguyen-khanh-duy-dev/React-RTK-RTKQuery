import { useForm } from "react-hook-form"
import * as authService from "@/services/auth"
import { useNavigate, useSearchParams } from "react-router"
import { useCurrentUser } from "@/features/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "@/services/auth/authServices"

function Login() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentUser = useCurrentUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "duynguyen@gmail.com",
            password: "12341234",
        },
    })

    useEffect(() => {
        if (currentUser) {
            const continuePath = params.get("continue") || "/"
            navigate(continuePath)
        }
    }, [currentUser, navigate, params])

    const onSubmit = async (data) => {
        try {
            const { access_token, refresh_token } = await authService.login(
                data
            )
            if (access_token) {
                localStorage.setItem("accessToken", access_token)
                localStorage.setItem("refreshToken", refresh_token)
                dispatch(getCurrentUser())
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Enter your email..."
                />
                {errors.email ? <p>{errors.email.message}</p> : ""}
                <br />
                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Enter your password..."
                />
                {errors.password ? <p>{errors.password.message}</p> : ""}
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
