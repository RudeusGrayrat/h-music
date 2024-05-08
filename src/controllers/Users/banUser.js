const { Users } = require('../../db');

const banUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const [rowsUpdated, [updatedUser]] = await Users.update(
            { ban: true },
            { where: { id: userId }, returning: true }
        );
        if (rowsUpdated === 0 || !updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        return res.status(200).json({ message: 'Usuario baneado exitosamente.', user: updatedUser });
    } catch (error) {
        console.error('Error al banear usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor al banear usuario' });
    }
};

module.exports = banUser;
