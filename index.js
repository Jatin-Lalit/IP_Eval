const express=require("express");
const {connection}=require("./db")

const {clint}=require("./redis");

const {user}=require("./routers/user.router");
const {IP}=require("./routers/ip.router.js");
const {auth}=require("./middleware/auth.js")
const app=express();
app.use(express.json());



app.use("/user",user);
app.use(auth);
app.use("/getdata",IP)

app.listen(5050,async()=>{


    try{
        await connection;
        console.log("Connected to DataBase")

    }catch(err){
        console.log(err)
    }
    console.log("Server is runnign")
})