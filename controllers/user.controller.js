const { createUserDB, getUserDB, getUseridDB, editUserDB, createAnimalDB, getAnimalsDB } = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

const createUser = async(req, res) => {
     
    try {
        const { nombre, apellido, edad, telefono, direccion, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const response = await createUserDB({ nombre, apellido, edad, telefono, direccion, email, hashPassword })
        if(!response.ok) {
            throw new Error('response.msg')
        }

        const payload = { id: response.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return res.json({
            ok: true,
            token
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const createAnimal = async(req, res) => {
    
    try {
        const { usuarios_id_fk, nombre_animal, genero_animal, tamano, edad_animal, descripcion } = req.body
        const { foto } = req.files

        const response = await createAnimalDB({ usuarios_id_fk, nombre_animal, genero_animal, tamano, edad_animal, descripcion, pathFoto: req.pathFoto })
        if(!response.ok) {
            throw new Error(response.msg)
        }

        foto.mv(path.join(__dirname, "../public/avatars/", req.pathFoto)), (error) => {
            if(error) throw new Error('No se puede guardar la imagen')
        }

        const payload = { id: response.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return res.json({
            ok: true,
            token
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body

        const response = await getUserDB(email)
        if(!response.ok) {
            throw new Error(response.msg)
        }

        if(!response.user) {
            throw new Error('No existe el email que intentas ingresar')
        }

        const { user } = response
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) {
            throw new Error('Contraseña incorrecta')
        }

        const payload = { id: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })

        return res.json({
            ok: true,
            token
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const getUser = async(req, res) => {
    const response = await getUseridDB(req.id)
    if(!response.ok) {
        return res.status(500).json({
            ok: false,
            msg: response.msg
        })
    }
    return res.json({
        ok: true,
        user: response.user
    })
}

const editUser = async(req, res) => {
    try {
        const { id } = req.params
        const { nombre, apellido, edad, telefono, direccion } = req.body

        const response = await editUserDB({ id, nombre, apellido, edad, telefono, direccion })

        if(!response.ok) {
            throw new Error(response.msg)
        }

        return res.json({
            ok: true,
            msg: response.msg
        })
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const getAnimals = async(req, res) => {
    const response = await getAnimalsDB()
    if(!response.ok) {
        return res.status(500).json({
            ok: false,
            msg: response.msg
        })
    }
    return res.json({
        ok: true,
        animals: response.animals
    })
}

module.exports = { createUser, loginUser, getUser, editUser, createAnimal, getAnimals }