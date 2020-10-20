import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import {clearNoti, setNoti} from "../reducers/notificationReducer";
import {addBLog} from "../reducers/blogReducer";

const BlogForm = (props) => {
  const [show, setShow] = useState(false)
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const dispatch = useDispatch()

  const createBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    dispatch(await addBLog(newBlog))
    dispatch(setNoti(`A new blog "${newBlog.title}" added`))
    setTimeout(() => {
      dispatch(clearNoti())
    },3000)
  }


  return (
    <> {!show &&
        <button onClick={() => setShow(true)}>new blog</button>
    }
    {show &&
            <>
              <h1>create new</h1>
              <form onSubmit={createBlog}>
                    title:<input type="text" value={blog.title}
                  onChange={e => setBlog({ ...blog, title: e.target.value })}/>
                <br/>
                    author:<input type="text" value={blog.author}
                  onChange={e => setBlog({ ...blog, author: e.target.value })}/>
                <br/>
                    url:<input type="text" value={blog.url}
                  onChange={e => setBlog({ ...blog, url: e.target.value })}/>
                <br/>
                <input type="submit" value="create"/>
                <br/>
                <button onClick={() => setShow(false)}>cancel</button>
              </form>
            </>
    }
    </>
  )
}

export default BlogForm