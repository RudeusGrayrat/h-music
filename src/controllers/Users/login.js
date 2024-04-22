const { Users } = require("../../db")

const login = async (req, res) => {
    try {
        const { email, password } = req.query

        if (!email || !password) {
            res.status(400).json({ message: "Faltan datos" })
        }

        const user = await Users.findOne({
            where: { email: email }
        });

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        if (user.password === password) {
            
            res.status(200).json(user)
        } else {
            res.status(403).json({ message: "Contraseña incorrecta" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
module.exports = login;