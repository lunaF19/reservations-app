import { Router } from "express"

import { controller_suites } from "../controllers";

const routerSuites = Router()

routerSuites.get('/', controller_suites.get)

export { routerSuites } 