import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from '.'
import { createInsertSql, createUpdateSql } from "../utils"


export const controller_suites_adm = {}

controller_suites_adm.get = async (req, res) => {
    const initial_petition = initialPetition();

    let sql = `Select s.id, s.id_category 
               From suites s;`

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        controller_message(initial_petition, error, req.method, "suites" )
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })

}

controller_suites_adm.post = async (req, res) => {
    const initial_petition = initialPetition();

    const { dml, suite } = req.body

    let sql


    if (dml === "U") {
        sql = createUpdateSql({
            table: "suites",
            updateParams: suite,
            pks: { id: suite.id }
        })
    }

    if (dml === "I") {
        sql = createInsertSql({
            table: "suites",
            insertParams: suite,
        })
    }
    //return res.sendStatus(400);

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "suites" )
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        return res.status(200).json(initial_petition)
    })



}