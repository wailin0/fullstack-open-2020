import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }
  }

  const handleLogout = () => (
    window.localStorage.clear()
  )

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification  error={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogPage = () => (
    <>
      <h2>blogs</h2>
      <Notification success={successMessage} error={errorMessage} />
      <BlogForm blogs={blogs} setBlogs={setBlogs}  setSuccessMessage={setSuccessMessage} />
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} blogs={blogs} setBlogs={setBlogs}/>
      )}
    </>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogPage()}
    </div>
  )
}

export default App