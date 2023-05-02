
const jwt = require("jsonwebtoken");
const clint = require("../redis.js");


const auth = async (req, res, next) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1];

        
        if (!token) return res.status(401).send("Please login again");

        const decode = await jwt.verify(token,masai);

        if (!decode) return res.send("Please login again");

        const isTokenBlacklisted = await clint.get(token);

        if (isTokenBlacklisted) return res.send("Unauthorized");

        req.body.userId = decode.UserId;
        

      
        next()

    } catch (err) {
        res.send(err);
    }
};

module.exports = { 
    auth
 };