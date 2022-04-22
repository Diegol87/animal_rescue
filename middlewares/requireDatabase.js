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

module.exports = { requireDatabase, requireLogin }