import jwt from "jsonwebtoken"
import {
    AUTH_JWT_TOKEN
} from "../config/environments"

const verifyJWT = (req, res, next) => {

    const { access_token } = req.headers

    try {
        const decoded = jwt.verify(access_token, AUTH_JWT_TOKEN)
        req.body.session = {
            Id: decoded.Id,
            Username: decoded.Username,
            Rol: decoded.Rol
        }
        next()
    } catch (error) {
        next(error)
    }
}

export {
    verifyJWT
}