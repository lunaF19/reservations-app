import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan"
import cors from 'cors'
import { DIR_PUBLIC, DIR_PROYECTO, PORT }  from "./config/environments"
import { routerSuites, routerUsers, routerApi, 
    routerReservations, routerMedia, 
    routerSuitesAdm, routerSuitesCategoriesAdm, routerCatalogMediaAdm, routerCatalogsAdm }  from "./router";
import { routerSuitesCategories } from "./router/router.categories";



// 
const app = express()

// settings 
app.set('port', PORT)
app.use(morgan("dev"))
app.use(express.json())
app.use( ( req, res, next ) => {
    next()
})

//cors configs
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/public',express.static(DIR_PUBLIC))

//app.use('/static', express.static(path.join(__dirname, 'public')))

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// config router
app.use('/api', routerApi); 
app.use('/api/users', routerUsers); 
app.use('/api/media', routerMedia); 
app.use('/api/suites', routerSuites); 
app.use('/api/suites_categories', routerSuitesCategories); 
app.use('/api/reservations', routerReservations); 

// Adm
app.use('/api/adm/suites', routerSuitesAdm); 
app.use('/api/adm/suites/categories', routerSuitesCategoriesAdm); 
app.use('/api/adm/catalogs', routerCatalogsAdm); 
app.use('/api/adm/catalog_media', routerCatalogMediaAdm); 


app.listen( app.get('port'), () => {
    console.log(`${DIR_PUBLIC} app listen on http://localhost:${app.get('port')}`)
})




