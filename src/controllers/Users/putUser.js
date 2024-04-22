const { Users } = require('../../db');

const putUser = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        if (req.method !== 'PUT') {
            return res.status(405).json({ error: 'Método no permitido' });
        }


        if (!email || !password || !newPassword) {
            return res.status(400).json({ error: 'Correo electrónico, contraseña actual y nueva contraseña son requeridos' });
        }
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }


        if (password !== user.password) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        } else {
            const [updatedUser] = await Users.update(
                { password: newPassword },
                { where: { email } }
            );
            if (updatedUser > 0) {
                return res.json({ success: 'Contraseña actualizada exitosamente' });
            } else {
                return res.status(404).json({ error: 'No se pudo actualizar la contraseña' });
            }
        }


    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cuenta' });
    }
};

module.exports = putUser;
