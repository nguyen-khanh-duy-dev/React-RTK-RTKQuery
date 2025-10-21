import { useForm } from "react-hook-form"
import * as authService from "@/services/auth"
import { useNavigate } from "react-router"
function Register() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "duy",
            lastName: "nguyen",
            email: "duynguyen@gmail.com",
            password: "12341234",
            password_confirmation: "12341234",
        },
    })

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
                    {...register("firstName", {
                        required: "Vui lòng điền này",
                    })}
                    placeholder="Enter your first name..."
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Enter your last name..."
                />
                <br />
                <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Enter your email..."
                />
                <br />
                <input
                    type="text"
                    {...register("password", { required: true })}
                    placeholder="Enter your password..."
                />
                <br />
                <input
                    type="text"
                    {...register("password_confirmation", { required: true })}
                    placeholder="Enter your password confirmation..."
                />
                <br />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
