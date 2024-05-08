const { Users } = require("../../db");

const putAdmin = async (req, res) => {
    const { userId } = req.params.userId;

    try {
        if (!userId) {
            throw new Error('No se proporcionó un ID de usuario.');
        }

        await Users.update(
            { rol: "admin" },
            {
                where: {
                    id: userId
                }
            }
        );

        return res.status(200).json({ message: "El usuario ahora es administrador." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = putAdmin;
