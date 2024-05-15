const { Users } = require("../../db");

const putAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            throw new Error('No se proporcionó un ID de usuario.');
        }

        const user = await Users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'No se encontró el usuario.' });
        }

        if(user.ban) {
            return res.status(400).json({ error: 'no se puede dar admin a un usuario baneado' });
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
