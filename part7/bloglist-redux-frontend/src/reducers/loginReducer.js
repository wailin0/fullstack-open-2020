import loginService from "../services/login";
import blogService from "../services/blogs";

const loggedInUserJSON = window.localStorage.getItem('blogUser')

const initState = loggedInUserJSON ? loggedInUserJSON : null

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null

        default:
            return state
    }
}

export const Login = (username, password) => {
    return async dispatch => {
        const loggedInUser = await loginService.login({username, password})
        window.localStorage.setItem(
            'blogUser', JSON.stringify(loggedInUser)
        )
        dispatch({
            type: 'LOGIN',
            data: loggedInUser
        })
    }
}

export const Logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export default loginReducer