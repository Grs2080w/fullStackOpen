const dummy = (blogs) => {
    return 1    
}

const totalLikes = (blogs) => {
    let total = 0
    for (let blog of blogs) {
        total += blog.likes
    }
    return total
}

const moreLikes = (blogs) => {
    let max = 0
    let bloger = {}
    for (let blog of blogs) {
        if (blog.likes > max) {
            max = blog.likes
            bloger = blog
        }
    }
    return bloger
}

let blog = [
    {
        author: "Michael Chan",
        blogs: 3
    },
    {
        author: "Edsger W. Dijkstra",
        blogs: 2
    },
]

const mostBlogs = (blogs) => {
    let max = 0
    let bloger = {}
    for (let blog of blogs) {
        if (blog.blogs > max) {
            max = blog.blogs
            bloger = blog
        }
    }
    return bloger
}



module.exports = {
dummy,
totalLikes,
moreLikes,
mostBlogs,
}