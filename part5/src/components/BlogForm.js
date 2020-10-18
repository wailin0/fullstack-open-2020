import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const [show, setShow] = useState(false)
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const createBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    blogService.create(newBlog)
      .then(response => {
        props.setBlogs([...props.blogs, response])
        props.setSuccessMessage(`a new blog ${blog.title} added`)
        setTimeout(() => {
          props.setSuccessMessage(null)
        }, 3000)
      })
      .catch(e => console.log(e))
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