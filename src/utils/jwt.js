const jwt = require("jsonwebtoken");

const jsonSign = (userData, secretKey,  expiresIn )=>{
    
    const token = jwt.sign(userData, secretKey, expiresIn );
    
    return token
}




module.exports = {jsonSign}