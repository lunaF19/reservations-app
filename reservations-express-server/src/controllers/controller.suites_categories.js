import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from '.'

export const controller_suites_categories = {}

controller_suites_categories.get = async (req, res) => {

    const initial_petition = initialPetition()
    let sql = `Select 
                sc.id,
                sc.name,
                sc.description,
                sc.price,
            (   Select cm.url_media
                From catalog_media cm 
                Where cm.id = sc.id_catalog_media 
                and num_order = 1
            ) as url_media
            From suites_categories sc;`

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "suites_categories")
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }
        return res.status(200).json(initial_petition)
    })

}

controller_suites_categories.getById = async (req, res) => {

    const initial_petition = initialPetition()

    const { id } = req.params

    const sqlSuitesCategories = `Select 
                sc.id,
                sc.name,
                sc.description,
                sc.price,
                sc.id_catalog_media
            From suites_categories sc
            Where id = '${id}'
            ;`

    executeMySql(sqlSuitesCategories, (error, response) => {
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            return res.status(400).json(initial_petition)
        }

        if (initial_petition.result.data.length > 0) {

            const sqlSuitesCategoriesFiles = `Select cm.id,
                            cm.num_order,
                            cm.media_type,
                            cm.url_media
                        From catalog_media cm
                        Where cm.id = '${initial_petition.result.data[0].id_catalog_media}'
                        Order by num_order;`
            console.log(sqlSuitesCategoriesFiles)
            executeMySql(sqlSuitesCategoriesFiles, (error, response) => {
                controller_message(initial_petition, error, req.method, "suites_categories" )
                initial_petition.result.dataFiles = response
                if (error) {
                    controller_errors(initial_petition, error)
                    return res.status(400).json(initial_petition)
                }
                return res.status(200).json(initial_petition)
            })

        }
        // return res.status(200).json(initial_petition)
    })








}