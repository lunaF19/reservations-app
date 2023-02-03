import { Router } from "express"

import { routerSuites } from '.'
import { conector } from "../config";


const routerApi = Router()


routerApi.get('/', (req, res) => {
  res.send('Desde el Api');
});

//routerApi.use('/auth', routerSuites);


routerApi.get('/test', (req, res) => {
  let sql = 'select "Hola Mundo" as keyword from dual;'
  console.log(req.body)
  conector.query(sql, (error, response) => {
 
    console.table(error)
    if (error) res.json(error)

    console.table(response)
    res.json(response)
  })

});

routerApi.post('/test', (req, res) => {
  let sql = 'select "Hola Mundo" as keyword from dual;'
  console.log(req.body)
  conector.query(sql, (error, response) => {
 
    console.table(error)
    if (error) res.json(error)

    console.table(response)
    res.json(response)
  })

});


// Rutas Manejo de peticiones publicas


// Rutas Manejo

export { routerApi } 