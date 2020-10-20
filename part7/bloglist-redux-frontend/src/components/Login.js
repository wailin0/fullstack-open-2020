import Notification from "./Notification";
import React, {useState} from "react";
import {clearNoti, setNoti} from "../reducers/notificationReducer";
import {Login} from "../reducers/loginReducer";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(Login(username, password))
            setUsername('')
            setPassword('')

        } catch (exception) {
            console.log(exception)
            dispatch(setNoti('wrong username or password'))
            setTimeout(() => {
                dispatch(clearNoti())
            }, 3000)
        }
    }

    return (
        <>
            <h2>log in to application</h2>
            <Notification/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm