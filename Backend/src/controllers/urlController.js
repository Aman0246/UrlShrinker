const { URLMODEL } = require("../models/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { isValid } = require("../utils/index");
// ===============================================================
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//================================================================
//POST /url/shorten
const shorten = async (req, res) => {
  try {

    const { longUrl } = req.body;
    if (!isValid(longUrl))
      return res
        .status(400)
        .send({ status: false, message: "longUrl must in form of string" });
    if (validUrl.isUri(longUrl)) {
      let dataUrl = await URLMODEL.findOne({ longUrl: longUrl }).select({urlCode:1,shortUrl:1,longUrl:1});
        if (dataUrl){
        return res
          .status(200)
          .send({
            status: false,
            message: "AlReady longUrl Preset",
            data:dataUrl,
          });}
      let urlcode = shortid.generate();
      let surl = "http://localhost:7000";
      let shortUrl = `${surl}/${urlcode.toLowerCase()}`;
      let data = await URLMODEL.create({
        longUrl: longUrl,
        urlCode: urlcode,
        shortUrl: shortUrl,
      });
      res.status(200).send({ status: true, message: "Blogs list", data: data });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Not a  valid URI " });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//GET /:urlCode
const getURL = async (req, res) => {
  try {
 let paramData = req.params;

 // =======FIRST CHECK IN CACH--------------------
 let getDat= myCache.get( "urlcode" );
 console.log(getDat)
 if(getDat){
   if(getDat.urlCode==paramData.urlCode){
   console.log("cash")
   return res.redirect(getDat.longUrl)}
}
//====================================================
const urlCode = await URLMODEL.findOne(paramData);
    if(urlCode){  
    let setCache = myCache.set( "urlcode",urlCode);
    let getData = myCache.get( "urlcode" );
    console.log({new:getData})
    return res.redirect(urlCode.longUrl);
  }
    if (!urlCode)
      return res
        .status(200)
        .send({
          status: false,
          message: "urlcode Not in Database Please First Generate Short Url",
          data: urlCode,
        });


  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { shorten, getURL };
