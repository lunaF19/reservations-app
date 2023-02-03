import { Router } from "express"

import { controller_catalogs_adm } from "../controllers";
import { uploadCatalogMedia } from "../libs/uploadFiles";

const routerCatalogsAdm = Router()

routerCatalogsAdm.get('/', controller_catalogs_adm.get);

routerCatalogsAdm.post('/', controller_catalogs_adm.post);

routerCatalogsAdm.delete('/:id', controller_catalogs_adm.delete);

export { routerCatalogsAdm } 