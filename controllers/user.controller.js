const { createUserDB, getUserDB, getUseridDB } = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

module.exports = { createUser, loginUser }