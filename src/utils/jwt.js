const jwt = require("jsonwebtoken");

const jsonSign = (userData, secretKey,  expiresIn )=>{
    
    const token = jwt.sign(userData, secretKey, expiresIn );
    
    return token
}


const jsonVerify = (token, secretKey, callback)=>{

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log('Error al verificar el token:', err);
          callback(err);
        } else {
          console.log('Token verificado con éxito:', decoded);
          callback(decoded);
        }
      });
}




module.exports = {jsonSign, jsonVerify}