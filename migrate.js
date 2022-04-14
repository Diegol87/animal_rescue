require("dotenv").config()
const { Pool } = require("pg")
const fs = require("fs")
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:esadiz87@localhost:5432/animalrescue'

const pool = process.env.DATABASE_URL  
    ? new Pool({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    })
    
    : new Pool({connectionString})

const migrate = async() => {
    try{
        const data = fs.readFileSync(__dirname + "/data.sql", {
            encoding: "utf-8"
        })
        await pool.query(data)
        console.log("Se creó la tabla con éxito")
    } catch(error) {
        console.log(error)
    }
}

migrate().then(console.log)