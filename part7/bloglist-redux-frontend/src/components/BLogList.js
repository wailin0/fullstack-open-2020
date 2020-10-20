import Blog from "./Blog";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return(
        <>
            {blogs.map(blog =>
                <Link to={`/blogs/${blog.id}`}><p style={{border: 'black solid 1px'}}>{blog.title}</p></Link>
            )}
        </>
    )
}

export default BlogList