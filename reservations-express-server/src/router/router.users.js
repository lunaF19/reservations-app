import { Router } from "express"
import path from "path"
import { controller_users } from "../controllers/";
import { uploadUserProfileImage } from "../libs/uploadFiles";

const routerUsers = Router()

// Para realizar consultas
routerUsers.get('/', controller_users.get);

// Para realizar updates
routerUsers.post('/', controller_users.post);

// 
routerUsers.post('/profileimage', uploadUserProfileImage.single(), controller_users.updateProfileImage);


export { routerUsers }

