const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const verifcationMiddleware = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const secretKey = JWT_SECRET_KEY;
    
    if (!token) {
        return res.status(401).json({ message: "No hay token suministrado por el front" });
    }
    try {
     
    } catch (error) {
        
    }

}

module.exports = verifcationMiddleware;