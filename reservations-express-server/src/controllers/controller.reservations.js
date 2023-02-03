
import { executeMySql } from "../config"

import { initialPetition, controller_errors } from '.'

import { createInsertSql, isValidFormatDate } from '../utils'

export const controller_reservations = {}

controller_reservations.get = async (req, res) => {

    const initial_petition = initialPetition();

    const { uid } = req.headers

    let sql = `
    Select 
        r.id, r.id_user, r.id_suite, r.date_init,
        r.date_end, r.date_made, r.total_amount, r.total_days
    From reservations r 
    Where r.id_user = '${uid}'
    ;`

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })

}

// Actualización de datos
controller_reservations.post = async (req, res) => {

    const initial_petition = initialPetition();

    const { uid } = req.headers
    const { reservation } = req.body
    
    const {
        id_user,
        id_suite,
        date_init,
        date_end,
        date_made,
        total_amount,
        // total_days
    } = reservation


    if (reservation.id_user !== uid) {
        initial_petition.error.errCode = "-3"
        initial_petition.error.message = "Datos suministrados no coinciden."
        return res.status(400).json(initial_petition)
    }

    if (!isValidFormatDate(reservation.date_init) || !isValidFormatDate(reservation.date_end)) {
        initial_petition.error.errCode = "-4"
        initial_petition.error.message = "Fecha no tiene un formato valido"
        return res.status(400).json(initial_petition)
    }

    reservation.date_init = `STR_TO_DATE('${reservation.date_init}','%d-%m-%Y') `
    reservation.date_end = `STR_TO_DATE('${reservation.date_end}','%d-%m-%Y')`

    let sql = `
    Insert Into reservations
    (  id_user,  id_suite,  
        date_init,  
        date_end,  
        date_made,
        total_amount)
    Values(  
        '${id_user}',  ${id_suite},   
        STR_TO_DATE('${date_init}','%d-%m-%Y'),  
        STR_TO_DATE('${date_end}','%d-%m-%Y'),  
        TIMESTAMP('${date_made}'),
        ${total_amount}
    )
    ;
    `

    console.log(sql)

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })


    // return res.send("Sin usar!!!")

}