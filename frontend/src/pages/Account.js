import AuthService from '../utils/AuthService'

function Account() {
    const user = AuthService.getCurrentUser()

    return <div>Welcome {user.name}</div>
}

export default Account
