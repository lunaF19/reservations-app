import { Router } from "express"

import { controller_suites_adm } from "../controllers";

const routerSuitesAdm = Router()

routerSuitesAdm.get('/', controller_suites_adm.get);

routerSuitesAdm.post('/', controller_suites_adm.post);

export { routerSuitesAdm } 