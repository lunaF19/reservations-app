
import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from './'

import { createUpdateSql, createInsertSql } from '../utils'

export const controller_users = {}

// Para obtener objetos
controller_users.get = async (req, res) => {
    const initial_petition = initialPetition();
    
    const { uid, access_token } = req.headers

    let sql = `
    Select u.id as id, u.name, u.lastname1, u.lastname2,
        u.email, u.nacionality_code, u.phone1, u.phone2,
        u.url_image, u.role_id
    From  users u
    Where u.id = '${uid}' ;`

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        controller_message(initial_petition, error, req.method, "users" )
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })

}

// Actualización de datos
controller_users.post = async (req, res) => {
    const initial_petition = initialPetition();
    
    const { uid } = req.headers
    const { user, dml, } = req.body
    user.id = uid

    let sql

    console.log({user})

    if (dml === "U") {
        sql = createUpdateSql({
            table: "users",
            updateParams: user,
            pks: { id: user.id }
        })
    }

    if (dml === "I") {
        sql = createInsertSql({
            table: "users",
            insertParams: user,
        })
    }
    

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "users" )
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message ="Error while update user data!"
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        return res.status(200).json(initial_petition)
    })


}

// Actualización de imagen de perfil
controller_users.updateProfileImage = (req, res) => {

    const initial_petition = initialPetition();

    const { protocol, host } = req
    const {
        //fieldname,
        //originalname,
        //encoding,
        mimetype,
        destination,
        filename,
        path: filePath,
        size,
    } = req.file

    const route = filePath.split("public")[1].replace(`\\`, '/').replace(`\\\\`, '/').replace(`//`, '/')
    const port = 5000 ? `:${5000}` : ''

    const url = `${protocol}://${host}${port}/public${route}`.replace(`\\`, '/').replace(`\\\\`, '/')

    const { uid } = req.headers

    let sql = createUpdateSql({
        table: "users",
        updateParams: { url_image: url },
        pks: { id: uid }
    }) 

    executeMySql(sql, (error, response) => {
        if (error) {
            initial_petition.message ="Error while update user profile image!"
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "User profile image was updated!"
        initial_petition.result = response
        initial_petition.result.url_image = url
        return res.status(200).json(initial_petition)
    })
}