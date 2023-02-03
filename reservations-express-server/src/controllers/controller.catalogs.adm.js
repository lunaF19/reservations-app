import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from '.'
import { createInsertSql, createUpdateSql } from "../utils"


export const controller_catalogs_adm = {}

controller_catalogs_adm.get = async (req, res) => {

    const initial_petition = initialPetition()
    let sql = `Select c.id
            From catalogs c
            ;`

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalogs" )
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error getting catalog data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "Data was get for catalog."
        return res.status(200).json(initial_petition)
    })

}

controller_catalogs_adm.post = (req, res) => {

    const initial_petition = initialPetition();

    const { id } = req.body

    const catalogs = {
        id
    }

    let sql
    
    sql = createInsertSql({
        table: "catalogs",
        insertParams: catalogs,
    })

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalogs" )
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message =  "Error to update catalog data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        initial_petition.message = "Data was updated for catalog."
        return res.status(200).json(initial_petition)
    })
}


controller_catalogs_adm.delete = async (req, res) => {

    const { id } = req.params
    
    const initial_petition = initialPetition()
    let sql = `Delete From catalogs
                Where id = '${id}'            
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