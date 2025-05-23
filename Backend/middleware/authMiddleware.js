const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

const authMiddleware = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
}
module.exports = authMiddleware;