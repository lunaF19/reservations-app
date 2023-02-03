import { executeMySql } from "../config"

import { controller_errors, initialPetition } from './'
import { createInsertSql, createUpdateSql, createWhereSql } from "../utils"

export const controller_media = {}

controller_media.get = async (req, res) => {
    const initial_petition = initialPetition();
    const { filters } = req.body

    const where = createWhereSql({ filters })

    const sql = `
    Select 
    id, type, url, file
    From multimedia 
    Where
    ${where};`

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })
}

controller_media.post = async (req, res) => {
    const initial_petition = initialPetition();

    const { dml, pks, multimedia } = req.body

    let sql

    if (dml === "U") {
        sql = createUpdateSql({
            table: 'multimedia',
            updateParams: multimedia,
            pks,
        })
    }

    if (dml === "I") {
        sql = createInsertSql({
            table: 'multimedia',
            insertParams: multimedia,
        })
    }

    executeMySql(sql, (error, response) => {
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        return res.status(200).json(initial_petition)
    })

}

controller_media.delete = async (req, res) => {
    const { filters } = req.body

    const where = createWhereSql({ filters })

    const sql = `
    Delete From multimedia
    Where 
    ${where};`

    executeMySql(sql, (error, response) => {
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        return res.status(200).json(initial_petition)
    })

}
