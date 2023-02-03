import { Router } from "express"

import { controller_catalog_media_adm } from "../controllers";
import { uploadCatalogMedia } from "../libs/uploadFiles";

const routerCatalogMediaAdm = Router()

routerCatalogMediaAdm.get('/', controller_catalog_media_adm.get);

routerCatalogMediaAdm.get('/:id', controller_catalog_media_adm.getById);


routerCatalogMediaAdm.post('/', uploadCatalogMedia.single(), controller_catalog_media_adm.post);

routerCatalogMediaAdm.delete('/:id/:num_order', controller_catalog_media_adm.delete);

export { routerCatalogMediaAdm } 