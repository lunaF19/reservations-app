import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from '.'
import { createInsertSql, createUpdateSql } from "../utils"


export const controller_suites_categories_adm = {}

controller_suites_categories_adm.get = async (req, res) => {

    const initial_petition = initialPetition()
    
    let sql = `Select 
                sc.id,
                sc.name,
                sc.description,
                sc.price,
                sc.id_catalog_media
               From suites_categories sc;`
    
    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "suites_categories" )
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error getting suite category data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "Data was get for suite categories."
        return res.status(200).json(initial_petition)
    })

}

controller_suites_categories_adm.post = async (req, res) => {

    const initial_petition = initialPetition()
    const { dml, suite_category } = req.body

    let sql


    if (dml === "U") {
        sql = createUpdateSql({
            table: "suites_categories",
            updateParams: suite_category,
            pks: { id: suite_category.id }
        })
    }

    if (dml === "I") {
        sql = createInsertSql({
            table: "suites_categories",
            insertParams: suite_category,
        })
    }
    
    //return res.sendStatus(400);

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "suites_categories" )
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message =  "Error to update suite category data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        initial_petition.message = "Data was updated for suite categories."
        return res.status(200).json(initial_petition)
    })


}