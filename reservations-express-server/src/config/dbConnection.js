import mysql from 'mysql'

import {
    MYSQL_USER, MYSQL_PASSWORD,
    MYSQL_HOST, MYSQL_DATABASE
} from './'

const configMySql = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    multipleStatements: true
}

const getConector = () => {
    try {
        const conector = mysql.createConnection(configMySql)
        return conector
    } catch (err) {
        throw new Error(err.message)
    }
}

export const executeMySql = (...params) => {
    let conector
    let result
    try {
        conector = getConector()
        conector.connect();
        console.log("Se abre la conexión ***")

        result = conector.query(...params)
        return result

    } catch (err) {
        console.error(`Error en executeMySql - ${err.message}`, err)
        throw new Error(err.message)
    } finally {
        console.log("Se cierra la conexión ***")
        conector.end()
    }
}
