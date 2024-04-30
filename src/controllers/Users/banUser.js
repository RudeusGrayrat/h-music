const { Users } = require('../../db');

const banUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rowsUpdated, [user]] = await Users.update(
            { banned: true },
            { where: { id: userId }, returning: true }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        return res.status(200).json({ message: 'Usuario baneado exitosamente.', user });

    } catch (error) {
        return res.status(400).json({ error: 'Error al banear usuario' });
    }
};

module.exports = banUser;
