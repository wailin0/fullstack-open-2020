import React from 'react'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import CommentForm from "./CommentForm";


const BlogPost = () => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(b => b.id === (id))
    if (!blog) {
        return null
    }
    console.log(blog.comments[0])
    return (
        <>
            <h1>{blog.title}</h1>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>{blog.likes} likes <button>like</button></p>
            <p>added by {blog.user.name}</p>
            <h3>comments</h3>
            <CommentForm blogId={blog.id} />
            <ul>
                {
                    blog.comments.map(comment => (
                        <li>{comment.message}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default BlogPost