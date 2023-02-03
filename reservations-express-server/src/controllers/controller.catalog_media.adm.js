import { executeMySql } from "../config"

import { initialPetition, controller_errors, controller_message } from '.'
import { createInsertSql, createUpdateSql } from "../utils"
import { helperImage } from "../libs/sharp"


export const controller_catalog_media_adm = {}

controller_catalog_media_adm.get = async (req, res) => {

    const initial_petition = initialPetition()
    let sql = `Select cm.id 
            From catalog_media cm
            Group by cm.id
            ;`

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalog_media")
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error getting catalog media data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "Data was get for catalog media."
        return res.status(200).json(initial_petition)
    })

}


controller_catalog_media_adm.getById = async (req, res) => {

    const initial_petition = initialPetition()
    const { id } = req.params

    let sql = `Select cm.id,
                    cm.num_order,
                    cm.media_type,
                    cm.url_media
            From catalog_media cm
            Where cm.id = '${id}'
            Order by num_order
            ;`

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalog_media")
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error getting catalog media data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "Data was get for catalog media."
        return res.status(200).json(initial_petition)
    })

}

controller_catalog_media_adm.post = (req, res) => {

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

    helperImage({ filePath: destination, fileName: filename, x_size: 600, y_size: 300 })

    const route = filePath.split("public")[1].replace(`\\`, '/').replace(`\\\\`, '/').replace(`//`, '/')
    const port = 5000 ? `:${5000}` : ''

    const url = `${protocol}://${host}${port}/public${route}`.replace(`\\`, '/').replace(`\\\\`, '/')


    const { dml, id, num_order } = req.headers

    const catalog_media = {
        id,
        num_order,
        media_type: mimetype,
        url_media: url
    }

    let sql

    if (dml === "U") {
        sql = createUpdateSql({
            table: "catalog_media",
            updateParams: catalog_media,
            pks: { id, num_order }
        })
    }

    if (dml === "I") {
        sql = createInsertSql({
            table: "catalog_media",
            insertParams: catalog_media,
        })
    }

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalog_media")
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error to update catalog media data."
            return res.status(400).json(initial_petition)
        }
        initial_petition.result = response
        initial_petition.message = "Data was updated for catalog media data."
        return res.status(200).json(initial_petition)
    })
}


controller_catalog_media_adm.delete = async (req, res) => {

    const { id, num_order } = req.params

    const initial_petition = initialPetition()
    let sql = `Delete From catalog_media 
            Where id = '${id}' and num_order = ${num_order}
            
            ;`

    console.log(sql)

    executeMySql(sql, (error, response) => {
        controller_message(initial_petition, error, req.method, "catalog_media" )
        initial_petition.result.data = response
        if (error) {
            controller_errors(initial_petition, error)
            initial_petition.message = "Error to delete catalog media."
            return res.status(400).json(initial_petition)
        }
        initial_petition.message = "Was deleted catalog media."
        return res.status(200).json(initial_petition)
    })

}