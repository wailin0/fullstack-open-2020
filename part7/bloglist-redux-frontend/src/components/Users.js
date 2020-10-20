import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Users = () => {

    const users = useSelector((state) => state.users)

    return (
        <>
            <h1>Users</h1>
            <table>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {
                    users.map(user => (
                        <>
                            <tr>
                                <td><Link to={`/users/${user.id}`} >{user.username}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        </>
                    ))
                }
            </table>
        </>
    )
}

export default Users