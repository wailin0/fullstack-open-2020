import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import {useDispatch, useSelector} from "react-redux";
import {clearNoti, setNoti} from "./reducers/notificationReducer";
import {initializeBlog} from "./reducers/blogReducer";
import {Login} from "./reducers/loginReducer";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Users from "./components/Users";
import {initializeUsers} from "./reducers/userReducer";
import LoginForm from "./components/Login";
import BlogPage from "./components/BlogPage";
import UserPage from "./components/UserPage";
import BlogList from "./components/BLogList";
import BlogPost from "./components/BlogPost";

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
    useEffect(() => {
        dispatch(initializeBlog())
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('blogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
        }
    }, [])


    const handleLogout = () => (
        window.localStorage.clear()
    )




    return (
        <div>
            {user === null && <LoginForm/>}
            {user !== null &&
            <BrowserRouter>
                <BlogPage />
                <Switch>
                    <Route path="/" exact component={BlogList} />
                    <Route path="/users" exact component={Users}/>
                    <Route path="/users/:id" component={UserPage}/>
                    <Route path="/blogs/:id" component={BlogPost}/>
                </Switch>
            </BrowserRouter>
            }

        </div>
    )
}

export default App