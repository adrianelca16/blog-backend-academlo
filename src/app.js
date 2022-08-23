//*Achivos de rutas

const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const postRouter = require('./post/post.router').router

//*dependencias
const express = require('express')

//! configuraciones iniciales
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postRouter)



app.listen(8000, () => {
    console.log('server started at port 8000')
})