const { Users } = require('../../db');

const unBanUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const [rowsUpdated, [user]] = await Users.update(
            { ban: false },
            { where: { id: userId }, returning: true }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }//
        return res.status(200).json({ message: 'Usuario desbaneado exitosamente.', user });
    } catch (error) {
        return res.status(400).json({ error: 'Error al desbanear usuario' });
    }
};

module.exports = unBanUser;
