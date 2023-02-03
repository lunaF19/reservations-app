import path from "path"
import dotenv from "dotenv"

dotenv.config()

const DIR_PROYECTO = __dirname.split("src")[0]
const DIR_PUBLIC = path.join(DIR_PROYECTO, 'public')


const { 
    PORT,
    MYSQL_HOST,
    MYSQL_USER, 
    MYSQL_PASSWORD,
    MYSQL_DATABASE, 
    MYSQL_PORT,
    AUTH_JWT_TOKEN
} = process.env

export {

    PORT,
    DIR_PROYECTO,
    DIR_PUBLIC,


    MYSQL_HOST,
    MYSQL_USER, 
    MYSQL_PASSWORD,
    MYSQL_DATABASE, 
    MYSQL_PORT,
    AUTH_JWT_TOKEN,
}

