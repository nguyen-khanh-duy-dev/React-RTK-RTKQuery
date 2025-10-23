import { checkExistsEmail } from "@/services/auth"
import { addMethod, object, ref, string } from "yup"

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Định nghĩa lại method cho email. Ghi đè trường email có sẵn của Yup
addMethod(string, "email", function (message) {
    return this.matches(EMAIL_REGEX, {
        message,
        name: "email",
        excludeEmptyString: true,
    })
})

let timer

const debounceCheckExistsEmail = (email) => {
    return new Promise((resolve, reject) => {
        clearTimeout(timer)
        timer = setTimeout(async () => {
            try {
                const exists = await checkExistsEmail(email)
                resolve(exists)
            } catch (error) {
                reject(error)
            }
        }, 600)
    })
}

export const registerSchema = object({
    firstName: string().required("Trường này là bắt buộc").min(2),
    lastName: string().required("Trường này là bắt buộc").min(2),
    email: string()
        .email("Sai định dạng email")
        .test(
            "email",
            "Email đã tồn tại, chọn email khác",
            async (value, context) => {
                if (!value) return false

                try {
                    await string().email().validate(context.parent.email)
                    const exists = await debounceCheckExistsEmail(value)
                    return !exists
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    console.log(error)

                    return false
                }
            }
        ),
    password: string().min(8, "Mật khẩu tối thiểu 8 kí tự"),
    password_confirmation: string()
        .oneOf([ref("password")], "Mật khẩu nhập lại không khớp")
        .required("Bắt buộc nhập"),
})
