const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const verifcationMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token:',token);
    
    if(!token) {
        return res.status(401).json({message: "No se recibió ningún token"});
    }

    try {
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Token inválido' });
          }
          console.log('Token verificado con éxito:', decoded);
          req.user = decoded;
          next();
      });
    } catch (err) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }


  }
  

module.exports = verifcationMiddleware;
  // jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       console.log('Error al verificar el token:', err);
  //       return res.status(401).json({ message: 'Token invalido' });
  //     } else {
  //       console.log('Token verificado con éxito:', decoded);
  //       next();
  //     }
  //   });