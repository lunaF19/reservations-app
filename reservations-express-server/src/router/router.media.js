import { Router } from "express"

import { controller_media } from "../controllers";

const routerMedia = Router()

// Para realizar consultas
routerMedia.get('/', controller_media.get);

// Para eliminar data de media
routerMedia.delete('/', controller_media.delete);

// Para realizar update o insert
routerMedia.post('/', controller_media.post );

export { routerMedia }

