const { Users } = require('../../db');

const putRol = async (req, res) => {
    try {
        const { email, rol } = req.body;

        await Users.update(
            { rol: rol },
            { where: { email } }
        );
        return res.json({ success: 'Contraseña actualizada exitosamente' });


    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cuenta' });
    }
};

module.exports = putRol;
