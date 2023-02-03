import { Router } from "express"

import { controller_suites_categories_adm } from "../controllers";

const routerSuitesCategoriesAdm = Router()

routerSuitesCategoriesAdm.get('/', controller_suites_categories_adm.get);

routerSuitesCategoriesAdm.post('/', controller_suites_categories_adm.post);

export { routerSuitesCategoriesAdm } 