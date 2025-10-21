import { useCurrentUser } from "@/features/auth"

function Profile() {

    const currentUser = useCurrentUser()

    return (
        <div>
            {currentUser.firstName} {currentUser.lastName}
        </div>
    )
}

export default Profile
