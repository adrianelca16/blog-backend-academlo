const postDB = []
const uuid = require('uuid')

const createPost = (data, user_id) => {
    const newPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image,
        user_id: user_id,
        published: true
    }
    postDB.push(newPost)
    return newPost
}

const getAllPost = () => {
    return postDB
}

const getPostByID = (id) => {
    const data = postDB.filter(item => item.id === id)
    return data.length ? data[0] : false
}

const getPostMyUser = (user_id) => {
    const data = postDB.filter(item => item.user_id === user_id)
    return data.length ? data : false
}

const getPostMyUserById = (user_id, id) => {
    const data = postDB.filter(item => { return item.user_id === user_id && item.id === id })
    return data.length ? data[0] : false
}


const deleteMyPost = (user_id, id) => {
    const index = postDB.findIndex(item => item.id === id)

    if (index !== -1) {
        if (postDB[index].user_id === user_id) {
            postDB.splice(index, 1)
            return postDB
        }
    } else {
        return false
    }
}

const updateMyPost = (user_id, id, data) => {
    const index = postDB.findIndex(item => item.id === id)
    if (index !== -1) {
        if (postDB[index].user_id === user_id) {
            postDB[index] = {
                id: id,
                title: data.title,
                content: data.content,
                header_image: data.header_image,
                user_id: user_id,
                published: true
            }
            return postDB
        }
    }
    return false
}
module.exports = {
    createPost,
    getAllPost,
    getPostByID,
    getPostMyUser,
    getPostMyUserById,
    deleteMyPost,
    updateMyPost
}