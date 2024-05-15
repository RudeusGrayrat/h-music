const { Users } = require("../../db");
const { compare } = require("../../utils/bcrypt");
const { jsonSign } = require("../../utils/jwt");
const { JWT_SECRET_KEY } = process.env

const login = async (req, res) => {
    try {
        const { email, password } = req.query

        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const user = await Users.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const response = await compare(password, user.password);
        
        const userData = {
            id: user.id,
            name: user.name,
        } 

        if (!response) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        if(user.ban) {
            return res.status(408).json({ message: "Usuario baneado" });
        }

        const token = jsonSign(userData, JWT_SECRET_KEY, { expiresIn : "5h"});
        // Reemplaza el token del usuario en el objeto user
        return res.status(200).json({user, token});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = login;