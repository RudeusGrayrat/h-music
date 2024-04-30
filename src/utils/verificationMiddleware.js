const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const { jsonVerify } = require("./jwt")

const verifcationMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: "No se recibio ningun token"});
    
    console.log(token);
    const verifyCallback = (err, decoded) => {
        if(err) return res.status(401).json({message: "Token invalido"});

        req.user = decoded;

        next();
    }

    jsonVerify(token, JWT_SECRET_KEY, verifyCallback);


}

module.exports = verifcationMiddleware;