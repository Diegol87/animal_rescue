const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:esadiz87@localhost:5432/animalrescue'

const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    })

    : new Pool({connectionString})

// Crear un usuario a tráves de registro
const createUserDB = async({ nombre, apellido, edad, telefono, direccion, email, hashPassword }) => {
    const client = await pool.connect()

    const query = {
        text: 'INSERT INTO usuarios (nombre, apellido, edad, telefono, direccion, email, password) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        values: [nombre, apellido, edad, telefono, direccion, email, hashPassword]
    }

    try {
        const response = await client.query(query)
        const { id } = response.rows[0]
        return {
            ok: true,
            id,
        }
    } catch (error) {
        if(error.code === '23505') {
            return {
                ok: false,
                msg: 'Ya existe el email registrado'
            }
        }
            return {
                ok: false,
                msg: error.message
            }
    } finally {
        client.release()
    }
}

//Crear una mascota a tráves de postulación
const createAnimalDB = async({ usuarios_id_fk, nombre_animal, genero_animal, tamano, edad_animal, descripcion, pathFoto }) => {
    const client = await pool.connect()

    const query = {
        text: 'INSERT INTO publicacion_animal (usuarios_id_fk, nombre_animal, genero_animal, tamano, edad_animal, descripcion, foto) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        values: [usuarios_id_fk, nombre_animal, genero_animal, tamano, edad_animal, descripcion, pathFoto]
    }

    try {
        const response = await client.query(query)
        const { id } = response.rows[0]
        return {
            ok: true,
            id
        }

    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

//Poder traer la información del usuario para poder realizar el login
const getUserDB = async(email) => {
    const client = await pool.connect()
    
    const query = {
        text:'SELECT * FROM usuarios WHERE email = $1',
        values: [email]
    }

    try {
        const response = await client.query(query)

        return {
            ok: true,
            user: response.rows[0]
        }

    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

//Traer el usuarios a tráves del id a la vista profile y realizar un put del usuario específico
const getUseridDB = async(id) => {
    const client = await pool.connect()

    const query = {
        text: 'SELECT id, nombre, apellido, edad, telefono, direccion, email FROM usuarios WHERE id = $1',
        values: [Number(id)] 
    }

    try {
        const response = await client.query(query)

        return {
            ok: true,
            user: response.rows[0]
        }

    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    }
}

//Para poder editar el usuario en la vista de profile
const editUserDB = async({ id, nombre, apellido, edad, telefono, direccion }) => {
    const client = await pool.connect()

    const query = {
        text: 'UPDATE usuarios SET nombre = $2, apellido = $3, edad = $4, telefono = $5, direccion = $6 WHERE id = $1',
        values: [Number(id), nombre, apellido, edad, telefono, direccion]
    }
    try {
        const response = await client.query(query)

        return {
            ok: true,
            user: response.rows
        }
        
    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

//Traer el listado completo de animales para dejarlos dentro de una tabla en la vista de postulaciones.
const getAnimalsDB = async() => {
    const client = await pool.connect()

    try {
        const response = await client.query('SELECT id, nombre_animal, genero_animal, edad_animal, tamano, descripcion, foto FROM publicacion_animal')
        return {
            ok: true,
            animals: response.rows
        }

    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

//Para poder eliminar una postulación en la vista de adminsitrador
const deleteAnimalDB = async(id) => {
    const client = await pool.connect()

    const query = {
        text: 'DELETE FROM publicacion_animal WHERE id = $1',
        values: [id]
    }

    try {
       await client.query(query)

        return {
            ok: true,
        }
        
    } catch (error) {
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

module.exports = { createUserDB, getUserDB, getUseridDB, editUserDB, createAnimalDB, getAnimalsDB, deleteAnimalDB }