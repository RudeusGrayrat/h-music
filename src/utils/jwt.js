const jwt = require("jsonwebtoken");

const jsonSign = (userData, secretKey,  expiresIn )=>{
    
    const token = jwt.sign(userData, secretKey, expiresIn );
    
    return token
}

const jsonVerify = async (token, secretKey)=>{
    try {
        
        const verifyUser = await jwt.verify(token, secretKey);
        return verifyUser
        
    } catch (error) {
        console.log("Error al verificar el token: ", error)
        throw error;
    }
}




module.exports = {jsonSign, jsonVerify}