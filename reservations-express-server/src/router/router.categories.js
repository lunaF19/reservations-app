import { Router } from "express"

import { controller_suites_categories } from "../controllers";


const routerSuitesCategories = Router()

routerSuitesCategories.get('/', controller_suites_categories.get)
routerSuitesCategories.get('/:id', controller_suites_categories.getById)

export { routerSuitesCategories } 