const { URLMODEL } = require("../models/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { isValid } = require("../utils/index");
var validator = require('validator');
const {trim} =require("../utils/index")


//=============================REDIS CONNECT===============================================
const redis = require('redis');
const { promisify } = require("util");
const { response } = require("express");

const redisClient = redis.createClient(
  14710,
  "redis-14710.c82.us-east-1-2.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("wWYaqcPQLd1ewRaug7BA8VbeifiQGA1z", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
//=================================================================================
//POST /url/shorten
const shorten = async function (req, res) {
  try {
    let { longUrl } = req.body;
    if(!Object.keys(req.body).length>0) return res.status(400).send({status:false ,message:"Data not found in body"})

    if (!isValid(longUrl)) {
      return res.status(400).send({ status: false, message: "longUrl must be a string" });
    }
  
    if (!validator.isURL(longUrl)) {
      return res.status(400).send({status: false, message:'in valalid Domain' });
    }
    longUrl=trim(longUrl)
    if (!validUrl.isUri(longUrl)) {
      return res.status(400).send({status:false ,message: 'Invalid URL' });
    }


    // Check if the URL already exists in the cache================================================
    let cacheUrl = await GET_ASYNC(longUrl);
    if (cacheUrl) {
      // console.log({cachs:cacheUrl})
      let data=JSON.parse(cacheUrl)//for taking output in readable
      return res.status(201).send({ status: true, data:data });
    }

    // Check if the URL already exists in the database=====================================================
    let url = await URLMODEL.findOne({ longUrl: longUrl });
    // console.log(url)
    if (url) {
      // Cache the URL for 24 hours
      let setCaches= await SET_ASYNC(longUrl, JSON.stringify({ urlCode: url.urlCode.toLowerCase(), shortUrl: url.shortUrl.toLowerCase() }), 'EX', 24 * 60 * 60);
      let data=JSON.parse(setCaches)//for taking output in readable
      return res.status(201).send({ status: true,data:data });
    }

    const urlCode = shortid.generate();
    const shortUrl = `http://localhost:7000/${urlCode.toLowerCase()}`;
  


    // Create a new URL document and save it to the database
     let createDb = await URLMODEL.create({
      urlCode:urlCode.toLowerCase(),
      longUrl:longUrl,
      shortUrl:shortUrl,
    });

    // Cache the URL for 24 hours                                  , 'EX', 24 * 60 * 60
    await SET_ASYNC(longUrl, JSON.stringify({ urlCode:urlCode.toLowerCase(), shortUrl:shortUrl }));  

    res.status(201).send({ status: true, data:createDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//GET /:urlCode
const getURL = async (req, res) => {
  try {
    const { urlCode } = req.params;

    let cachedUrl = await GET_ASYNC(urlCode);
    if (cachedUrl) {
      console.log("cach data")
      const { longUrl } = JSON.parse(cachedUrl);
      return res.redirect(longUrl);
    }

    const url = await URLMODEL.findOne({
      urlCode,
    });

    if (!url) {
      return res.status(404).json({
        status: false,
        message: 'URL not found',
      });
    }

    await SET_ASYNC(
      urlCode,
      JSON.stringify({ longUrl: url.longUrl }),
      'EX',
      24 * 60 * 60
    );

    return res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { shorten, getURL };
