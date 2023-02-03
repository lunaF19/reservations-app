import { executeMySql } from "../config"

import { initialPetition, controller_errors } from '.'
import { isValidFormatDate } from "../utils"
import { format } from "mysql"

export const controller_suites = {}

controller_suites.get = async (req, res) => {

    const initial_petition = initialPetition()

    const { date1, date2, id_category } = req.query

    if (!date1 || !date2 || !id_category) {
        initial_petition.error.errCode = "-3"
        initial_petition.error.message = "Faltan parametros!"
        return res.status(400).json(initial_petition)
    }

    if (!isValidFormatDate(date1) || !isValidFormatDate(date2)) {
        initial_petition.error.errCode = "-4"
        initial_petition.error.message = "Fecha no tiene un formato valido"
        return res.status(400).json(initial_petition)
    }

    let sql = `
    Select s.id -- id_suite o num_suite
    From suites s
    Where s.id_category = '${id_category}'
    And STR_TO_DATE('${date1}','%d-%m-%Y') > DATE_ADD(SYSDATE(), INTERVAL 3 DAY)
    And STR_TO_DATE('${date2}','%d-%m-%Y') > DATE_ADD(SYSDATE(), INTERVAL 3 DAY)
    And not Exists (
        Select 1
        From  reservations r,
            reservations_deta rd
        Where r.id_suite =  s.id -- Se compara contra reservations
        And rd.id_reservation  = r.id -- Se compara contra reservations_deta
        And apply_date Between STR_TO_DATE('${date1}','%d-%m-%Y') And STR_TO_DATE('${date2}','%d-%m-%Y') -- Se coloca el rango de fecha
        -- And apply_date > DATE_ADD(SYSDATE(), INTERVAL 3 DAY)
    )
    ;`

    executeMySql(sql, (error, response) => {
        initial_petition.result.data = response
        // console.log("response ***", response)
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        let sql2 = ` 
        call p_get_data_reservation(
            STR_TO_DATE('${date1}','%d-%m-%Y'),
            STR_TO_DATE('${date2}','%d-%m-%Y'),
            '${id_category}',
            @total_days,
            @total_amount
        ); select @total_days as total_days , @total_amount as total_amount`

        // console.log(sql2)
        executeMySql(sql2, (error2, response2) => {
            if (error2) {
                controller_errors(initial_petition, error)
                return res.status(400).json(initial_petition)
            }
            const { total_days, total_amount } = response2[1][0]

            // console.log({total_days,total_amount})
            initial_petition.result.total_days = total_days
            initial_petition.result.total_amount = total_amount
            return res.status(200).json(initial_petition)
        })



    })

}