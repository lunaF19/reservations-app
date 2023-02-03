import multer from "multer";

import path from "path"
import { DIR_PUBLIC } from "../config";

const storageUserProfileImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(DIR_PUBLIC, 'users'))
    },
    filename: (req, file, cb) => {
        const { uid } = req.headers
        const fileext = file.originalname.split(".").at(-1)
        const filename = `${uid}.${fileext}`
        cb(null, filename)
    }
})

export const uploadUserProfileImage = multer({ storage: storageUserProfileImage })



// For  media catalog 
const storageCatalogMedia = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(DIR_PUBLIC, 'catalog_media'))
    },
    filename: (req, file, cb) => {
        const { id, num_order } = req.headers
        const fileext = file.originalname.split(".").at(-1)
        const filename = `${id}-${num_order}_${Date.now()}.${fileext}`
        cb(null, filename)
    }
})


export const uploadCatalogMedia = multer({ storage: storageCatalogMedia })