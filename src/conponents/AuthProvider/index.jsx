import { useFetchCurrentUser } from "@/features/auth"

function AuthProvider() {
    useFetchCurrentUser()
    return null
}

export default AuthProvider
