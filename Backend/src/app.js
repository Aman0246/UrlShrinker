const express  = require('express')
const app = express()
var cors = require('cors')
app.use(cors({
    credentials:true,
    origin:"https://url-shrinker-adnc.vercel.app/"  
}))

const routes = require('./routes/route.js')



// Global middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//route middleware
app.use('/',routes)

module.exports = app

