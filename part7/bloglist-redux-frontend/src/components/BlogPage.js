import Notification from "./Notification";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const BlogPage = () => {

    const history = useHistory()
    const user = useSelector(state => state.login)
    const handleLogout = () => {
        window.localStorage.clear()
        history.push('/login')
    }
    if(user){
    return (
        <>
            <div className="nav-bar">
                <Link to="/" style={{padding: '5px'}}>blogs</Link>
                <Link to="/users" style={{padding: '5px'}}>users</Link>
                <span style={{padding: '5px'}}>{user.name} logged in <Button onClick={() => handleLogout()}  size="sm">logout</Button></span>
            </div>
            <h2>blogs</h2>
            <Notification/>
            <BlogForm/>

        </>
    )
}}

export default BlogPage