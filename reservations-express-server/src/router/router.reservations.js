import { Router } from "express"

import { controller_reservations } from "../controllers";

const routerReservations = Router()

// Para realizar consultas
routerReservations.get('/', controller_reservations.get);

// Para realizar updates
routerReservations.post('/', controller_reservations.post );

export { routerReservations }

