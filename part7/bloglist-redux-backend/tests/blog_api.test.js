const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('getting blog', () => {
// 4.8: Blog list tests, step1
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

// 4.9*: Blog list tests, step2
    test('blog unique identifier name must be id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('creating a blog', () => {
// 4.10: Blog list tests, step3
    test('testing blog POST request', async () => {
        const newBlog = {
            title: "title",
            author: "author",
            url: "url",
            likes: 4
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain(
            'title'
        )
    })

// 4.11*: Blog list tests, step4
    test('if the likes property is missing from the request, it will default to the value 0.', async () => {
        const newBlog = {
            title: 'blog test',
            author: 'test author',
            url: 'test url',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
    })

// 4.12*: Blog list tests, step5
    test('if the title and url are missing from the request, the backend responds with the status code 400 Bad Request.', async () => {
        const newBlog = {
            author: 'test author',
            likes: 2
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of a blog', () => {

    test('if success, return code 204', async () => {
        const newBlog = {
            title: 'blog test',
            author: 'test author',
            url: 'test url',
        }
        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        const blogToDelete = res.body

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })
})

describe('updating a blog', () => {

    test('if success, return code 200', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        blogToUpdate.likes = 1212

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})