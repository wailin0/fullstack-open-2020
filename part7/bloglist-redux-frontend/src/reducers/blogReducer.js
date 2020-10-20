import blogsService from "../services/blogs";

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BLOG': {
            return [...state, action.data]
        }
        case 'DELETE_BLOG' : {
            const copyBLog = [...state]
            return copyBLog.filter(b => b.id !== action.data.id)
        }
        case 'INIT_BLOG' : {
            return action.data
        }
        case 'ADD_COMMENT' : {
            const  blogId = action.data.blogId

            const blog = state.find(b => b.id === blogId)
            const newComment = {
                message : action.data.message
            }

            const commentedBlog = {
                ...blog,
                comments: [...blog.comments, newComment],
            }

            return state.map(b => (b.id !== blogId ? b : commentedBlog))
        }
        case "LIKE_BLOG": {
            console.log(state)
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            return state.map(b =>
                b.id !== id ? b : likedBlog
            )
        }
    }
    return state
}

export const addBLog = (data) => {
    return async dispatch => {
        const newBlog = await blogsService.create(data)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const blogToChange = {...blog, likes: blog.likes + 1}
        const likedBlog = await blogsService.update(blogToChange)
        dispatch({
            type: 'LIKE_BLOG',
            data: likedBlog
        })
    }
}

export const uploadComment = (blogId, comment) => {
    return async dispatch => {
         await blogsService.createComment(blogId, comment)
        const message = {
            ...comment,
            blogId
        }
        dispatch({
            type: 'ADD_COMMENT',
            data: message
        })
    }
}

export const deleteBLog = (id) => {
    return async dispatch => {
        await blogsService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export const initializeBlog = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export default blogReducer
