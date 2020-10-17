const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    return blogs.reduce((sum, current) => {
        return sum + current.likes;
    }, 0)
}


const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    return blogs.reduce((acc, blog) => {
        if (blog.likes > acc.likes) {
            return {title: blog.title, author: blog.author, likes: blog.likes}
        }
        return acc;
    }, blogs[0])
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}