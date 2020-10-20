import React, { useState } from 'react'
import blogService from '../services/blogs'
import {useDispatch} from "react-redux";
import {likeBlog} from "../reducers/blogReducer";
import {clearNoti, setNoti} from "../reducers/notificationReducer";

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)
  const giveLike = async () => {

    dispatch(await likeBlog(blog))
    dispatch(setNoti(`You vote "${blog.title}"`))
    setTimeout(() => {
      dispatch(clearNoti())
    },3000)
  }

  const deleteBlog =  (id) => {
    if (window.confirm(`Remove Blog ${blog.title} By ${blog.author}`)) {
      dispatch(deleteBlog(id))
    }
  }

  return (
    <div className="blog">
      {!showDetail && (
        <>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetail(true)}>view</button>
        </>
      )}
      {showDetail && (
        <>
          {blog.title}
          <button onClick={() => setShowDetail(false)}>hide</button>
          <br/>
          {blog.url}
          <br/>
                    likes {blog.likes}
          <button onClick={() => giveLike()}>like</button>
          <br/>
          {blog.author}
        </>
      )}
      { (blog.user.username === username && showDetail) &&
                <button onClick={() => deleteBlog(blog.id)}>remove</button>
      }
    </div>
  )
}
export default Blog
