const postControllers = require('./post.controller')


const getAll = (req, res) => {
    const data = postControllers.getAllPost()
    return res.status(200).json({items: data.length, data: data})
}

const create = (req, res) => {
    const data = req.body
    const user_id = req.user.id

    if(!data){
        return res.status(400).json({message: 'Missing data'})
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image) {
            return res.status(400).json({message: 'All fields must be completed', fields: {
                title: 'string',
                content: 'string',
                header_image: 'string',
            }})
    } else{
        const response = postControllers.createPost(data, user_id)
        return res.status(201).json({message: 'Post create succesfully', data: response})
    }
}

const getPostByID = (req, res) => {
    const id = req.params.id

    const data = postControllers.getPostByID(id)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: `Post with id: ${id} does not exist`})
    }

}

const getPostMyUser = (req, res) => {
    const user_id = req.user.id
    const data = postControllers.getPostMyUser(user_id)
    if(data){
        return res.status(200).json({post: data})
    }else{
        return res.status(404).json({message: 'The user does not have a post'})
    }
   
}

const getMyPostById = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id

    const data = postControllers.getPostMyUserById(user_id, id)

    if(data){
        return res.status(200).json({data: data})
    }else{
        res.status(404).json({message: 'the post does not exist'})
    }
}

const deletePost = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id

    const data = postControllers.deleteMyPost(user_id, id)

    if(data){
        res.status(200).json({data: data})
    }else{
        res.status(400).json({message: 'Error Delete'})
    }
}

const updatePost = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id
    const body = req.body

    if(!body){
        return res.status(400).json({message: 'Missin data'})
    } else if (
        !body.title ||
        !body.content ||
        !body.header_image
    ){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            title: 'string',
            content: 'string',
            header_image: 'string',
        }})
    }else {
        const data = postControllers.updateMyPost(user_id, id, body)
        if(data){
            return res.status(200).json(data)
        }else{
            return res.status(401).json({message: "you don't have permission"})
        }
        
    }

}
module.exports = {
    getAll,
    create,
    getPostByID,
    getPostMyUser,
    getMyPostById,
    deletePost,
    updatePost
}