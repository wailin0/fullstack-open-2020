const Note = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'initial title 1',
        author: 'initial author 1',
        url: 'initial url 1',
        likes: 1
    },
    {
        title: 'initial title 2',
        author: 'initial author 2',
        url: 'initial url 2',
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Note.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    initialBlogs, blogsInDb, usersInDb
}