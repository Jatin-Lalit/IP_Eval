require("dotenv").config();
const ioredis=require("ioredis");

let configeration={
    host:"redis-12622.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port:12622,
    username:"default",
    password:process.env.redispass
}
const clint=new ioredis(configeration)
module.exports={
    clint
}