const { Users } = require('../../db');

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        if (allUsers.length === 0) {
            const mensaje = "No hay usuarios";

            return res.status(200).json(mensaje);
        }

        return res.status(200).json(allUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al traer usuarios' });

    }
};

module.exports = getUsers;
