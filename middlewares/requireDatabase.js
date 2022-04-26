const { nanoid } = require('nanoid')

const requireDatabase = (req, res, next) => {
    try {
        const { nombre, apellido, edad, telefono, direccion, email, password } = req.body

        if(
            !nombre?.trim() ||
            !apellido?.trim() ||
            !edad?.trim() ||
            !telefono?.trim() ||
            !direccion?.trim() ||
            !email?.trim() ||
            !password?.trim()
        ) {
            throw new Error("Algunos campos estan vacios")
        }
        
        next()
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const requireDatabaseanimals =(req, res, next) => {
    try {
        const { nombre_animal, genero_animal, edad_animal, tamano, descripcion } =
        req.body

        if(
            !nombre_animal?.trim() ||
            !genero_animal?.trim() ||
            !edad_animal?.trim() ||
            !tamano?.trim() ||
            !descripcion?.trim()
        ) {
            throw new Error('Algunos campos estan vacíos')
        }

        const { foto } = req.files
        const mimeTypes = ["image/jpeg", "image/png"]
        if(!mimeTypes.includes(foto.mimetype)) {

            throw new Error('Solo archivos png o jpg')
        }
        if(foto.size > 5 * 1024 * 1024) {
                throw new Error('Máximo 5 MB')
        }

        const pathFoto = `${nanoid()}.${foto.mimetype.split("/")[1]}`
        req.pathFoto = pathFoto

        next()

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const requireLogin = (req, res, next) => {
    try {
        const { email, password } = req.body

        if(
            !email?.trim() ||
            !password?.trim()
        ) {
            throw new Error("Algunos campos estan vacios")
        }

        next()

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

module.exports = { requireDatabase, requireLogin, requireDatabaseanimals }