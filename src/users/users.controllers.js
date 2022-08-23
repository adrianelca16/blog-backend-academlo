const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')

const userDB = [
    {
        "id": "fafa4304-cc20-44a4-a7a0-f692feafb266",
        "first_name": "string",
        "last_name": "string",
        "email": "example@example.com",
        "password": "$2b$10$iXA47IOGFgFyVBm1yNbUmOAkVeoVYwGsdpJmS3iLJrt5N.ZFDbSBO",
        "phone": "",
        "birthday_date": "DD/MM/YYYY",
        "rol": "admin",
        "profile_image": "",
        "country": "string",
        "is_active": true,
        "verified": false
    }
]

const getAllUsers = () => {
    return userDB
    //? select * from users;
}

const getUsersById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data.length ? data[0] : false;
    //? select * from users where id = ${id};
}

const createUsers = (data) => {
    const newUser = {
        id: uuid.v4(), //obligario y unico
        first_name: data.first_name, //obligario
        last_name: data.last_name, //obligario
        email: data.email, //obligario y unico
        password: hashPassword(data.password), //obligario
        phone: data.phone ? data.phone : '',  //unico
        birthday_date: data.birthday_date, //obligario
        rol: 'normal', //obligario y por defecto 'normal
        profile_image: data.profile_image ? data.profile_image : '',
        country: data.country, //obligatorio
        is_active: true, //obligario y por defecto true
        verified: false //obligario y por defecto false
    }
    userDB.push(newUser)
    return newUser
}

const deleteUser = (id) => {
    const index = userDB.findIndex(item => item.id === id)
    if (index !== -1) {
        userDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const updateUser = (id, data) => {
    const index = userDB.findIndex(item => item.id === id)
    if (index !== -1) {
        userDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: userDB[index].password,
            phone: data.phone,
            birthday_date: data.birthday_date,
            age: data.age,
            rol: 'normal',
            profile_image: data.profile_image,
            country: data.country,
            is_active: data.is_active
        }
        return userDB[index]
    } else {
        return createUsers(data)
    }
}


const getUserByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data.length ? data[0] : false;
    //? select * from users where email = ${email};
}


module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    deleteUser,
    updateUser,
    getUserByEmail
}