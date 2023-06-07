const express  = require('express')
const app = express()
var cors = require('cors')
app.use( res.header("Access-Control-Allow-Headers", "https://urlshortner-aman.onrender.com"))
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"  
}))

const routes = require('./routes/route.js')



// Global middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//route middleware
app.use('/',routes)

module.exports = app

