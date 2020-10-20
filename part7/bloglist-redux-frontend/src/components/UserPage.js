import React from 'react'
import {useSelector} from "react-redux"
import {useParams} from 'react-router-dom'

const UserPage = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(u => u.id === (id))
    console.log(user)
    if (!user) {
        return null
    }
    return (
        <>
            <h1>{user.name}</h1>
            <p>added blogs</p>
            {user.blogs.map(blog => (
                    <ul>
                        <li>{blog.title}</li>
                    </ul>
                )
            )}
        </>
    )
}

export default UserPage