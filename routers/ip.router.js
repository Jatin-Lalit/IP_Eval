const express=require("express");

const axios = require("axios");
const IP=express.Router();

IP.get("/:ip",async(req,res)=>{

    let ip=req.params.ip;
    let data=axios.get(`https://ipapi.co/${ip}/json/`)
   let city=data.city;
   res.send(city)

})







module.exports={
    IP
}