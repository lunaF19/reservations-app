import {
  Router
} from "express"
import {
  conector
} from "../config/dbConnection"
import jwt from "jsonwebtoken"
import {
  AUTH_JWT_TOKEN
} from "../config/environments"


const routerAuth = Router()


routerAuth.get("/", (req, res) => {
  res.json({
    res: "Todo ok con auth"
  })
})

routerAuth.post("/login", (req, res) => {

  const { user, pass } = req.body.usuario
  let sql

  if (!(user)) return res.json({ error: "Debe contener un usuario!" })

  if (!(pass)) return res.json({ error: "Debe contener una Contraseña!" });

  if (user && pass) {
    sql = ` SELECT Id, Username, Rol, ULTIMO_INICIO AS "UltimoInicio" FROM usuarios WHERE username='${user}' AND password= '${pass}'`

    conector.query(sql, (error, response) => {
      if (error) res.json(error)

      if (response.length == 0) return res.json({ error: "Login incorrecto, Usuario o Contraseña Erronea" })

      const { Id, Username, Rol } = response[0]
      const token = jwt.sign({ Id, Username, Rol }, AUTH_JWT_TOKEN, { expiresIn: '1h' })

      return res.json({ access_token: token, user: response[0] })
    })

  }
})

routerAuth.get("/veryfy", (req, res, next) => {

  const { access_token } = req.headers

  try {
    const decoded = jwt.verify(access_token, AUTH_JWT_TOKEN)
    res.json({
      res: " es valido el token! ",
      Id: decoded.Id,
      username: decoded.Username,
      Rol: decoded.Rol
    })
  } catch (error) {
    next(error)
  }
})


export {
  routerAuth
}