const { Users } = require("../../db");

const putDeleteAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            throw new Error('No se proporcionó un ID de usuario.');
        }

        await Users.update(
            { rol: "premium" },
            {
                where: {
                    id: userId
                }
            }
        );

        return res.status(200).json({ message: "El usuario dejó de ser administrador." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = putDeleteAdmin;
