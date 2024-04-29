const { Users } = require('../../db');

const putRol = async (email) => {
    try {
        if (!email) {
            throw new Error('Correo electrónico no proporcionado');
        }
        const updatedUser = await Users.update(
            { rol: "Premium" },
            { where: { email } }
        );

        if (updatedUser[0] === 0) {
            throw new Error('Usuario no encontrado o rol no actualizado');
        }
        return res.json({ success: 'Contraseña actualizada exitosamente' });

    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la cuenta' });
    }
};

module.exports = putRol;
