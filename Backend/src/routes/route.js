const express = require('express')
const router = express.Router()
const {shorten,getURL} =require("../controllers/urlController")


router.post("/url/shorten",shorten)
router.get("/:urlCode",getURL)




module.exports = router