const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const verifcationMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    
    if(!token) return res.status(401).json({message: "No se recibio ningun token"});

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log('Error al verificar el token:', err);
          return res.status(401).json({ message: 'Token invalido' });
        } else {
          console.log('Token verificado con éxito:', decoded);
          next();
        }
      });
}


module.exports = verifcationMiddleware;