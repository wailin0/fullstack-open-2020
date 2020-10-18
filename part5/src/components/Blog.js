import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, setBlogs, blogs }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [like, setLike] = useState(blog.likes)
  const giveLike = () => {
    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: like + 1
    }
    console.log(blog.user.id)
    blogService.update(blog.id, updateBlog)
      .then(res => {
        setLike(res.likes)
      })
      .catch(e => console.log(e))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove Blog ${blog.title} By ${blog.author}`)) {
      blogService.remove(blog.id)
        .then(() => {
          const copyBlogs = [...blogs]
          setBlogs(copyBlogs.filter((b) => b.id!==blog.id))
        })
        .catch(e => console.log(e))
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
                    likes {like}
          <button onClick={() => giveLike()}>like</button>
          <br/>
          {blog.author}
        </>
      )}
      { (blog.user.username === username && showDetail) &&
                <button onClick={() => deleteBlog()}>remove</button>
      }
    </div>
  )
}
export default Blog
