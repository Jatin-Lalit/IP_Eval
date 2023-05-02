const express=require("express");
const {um}=require("../models/user.model.js")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const clint=require("../redis.js")

const user=express.Router();


user.post("/signup",async(req,res)=>{
    try{
        const {name,email,pass}=req.body;
        const isPresent=await um.findOne({email});
        if(isPresent){
            res.send("Already Register");
        }else{
     bcrypt.hash(pass,5,async(err,hash_pass)=>{
        if(err){
            console.log(err)
        }else{
            let user=new um({name,email,pass:hash_pass});
            await user.save();
            res.send("Registration Completed")
        }
     })
        }
    }catch(err){
        console.log(err.massage)
    }
})

user.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        let user=await um.findOne({email});
        let hash=user.pass
        if(user){
            bcrypt.compare(pass,hash,(err,result)=>{
                if(result){
                    res.send({"msg":"login success","token":jwt.sign({UserId:user._id},"masai",{expiresIn:"30m"}),
                "refreshtoken":jwt.sign({UserId:user._id},"NXM",{expiresIn:"45m"})})
                }else{
                    res.send("wrong")
                }
            })
        }
    }catch(err){
        console.log(err.massage)
    }
})

user.get("/getnewtoken",(req,res)=>{
    const refreshtoken=req.headers.authorization;
    jwt.verify(refreshtoken,"NXM",(errdecoded)=>{
        if(err){
            res.send("please login again");
        }else{
            const token=jwt.sign({UserId:decoded.UserId},"masai",{expiresIn:"600m"}
            );
            res.send({"token":token})
        }
    })
})


user.get("/logout",async(req,res)=>{
    try{

        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(403);

        await clint.set(token,token);
        res.send("logout successful");


    }catch(err) {
        res.send(err.message)
    }
})





module.exports={
    user
}