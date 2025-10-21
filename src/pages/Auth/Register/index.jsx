import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import * as authService from "@/services/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { EMAIL_REGEX, registerSchema } from "@/utils/validators"
import { useEffect } from "react"

function Register() {
    const navigate = useNavigate()

    const {
        register,
        trigger,
        watch,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(registerSchema),
    })

    const password = watch("password")

    // Xử lý confirmation password. Nếu trogn web có nhiều trường hợp cần xử lý như này thì nên tạo ra custom hooks
    useEffect(() => {
        const confirmation = watch("password_confirmation")
        if (confirmation && password !== confirmation) {
            trigger("password_confirmation")
        } else {
            setError("password_confirmation", null)
        }
    }, [password, setError, trigger, watch])

    const email = watch("email")

    useEffect(() => {
        if (email && EMAIL_REGEX.test(email)) {
            authService.checkExistsEmail(email).then((exists) => {
                if (exists) {
                    setError("email", {
                        type: "check-email",
                        message: "Email đã tồn tại, chọn email khác",
                    })
                }
            })
        }

        if (email) trigger("email")
    }, [email, errors, setError, trigger])

    const onSubmit = async (data) => {
        try {
            await authService.register(data)
            navigate("/login")
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
                    {...register("firstName")}
                    placeholder="Enter your first name..."
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Enter your last name..."
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}

                <br />
                <input
                    type="text"
                    {...register("email")}
                    placeholder="Enter your email..."
                />
                {errors.email && <p>{errors.email.message}</p>}

                <br />
                <input
                    type="text"
                    {...register("password")}
                    placeholder="Enter your password..."
                />
                {errors.password && <p>{errors.password.message}</p>}

                <br />
                <input
                    type="text"
                    {...register("password_confirmation")}
                    placeholder="Enter your password confirmation..."
                />
                {errors.password_confirmation && (
                    <p>{errors.password_confirmation.message}</p>
                )}

                <br />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
