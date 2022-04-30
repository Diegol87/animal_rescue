const { getUserDB } = require('../database/db')

const requireAdmin = (req, res, next) => {
    try {
        const { email } = req.body

        const response = getUserDB(email)
        if(response !== "superadmin@test.com") {
            window.location.href = "/"
        } else {
            next()
        }


        
    } catch (error) {
        return res.status(400).json ({
            ok: false,
            msg: error.message
        })
    }
}

module.exports = { requireAdmin }