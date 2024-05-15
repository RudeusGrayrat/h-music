const { Users } = require('../../db');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../../utils/bcrypt');

const putUser = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        if (req.method !== 'PUT') {
            return res.status(405).json({error: 'Método no permitido. Por favor, utiliza el método PUT.'});
        }


        if (!email || !password || !newPassword) {
            return res.status(400).json({ error: 'Faltan datos. Correo electrónico, contraseña actual y nueva contraseña son requeridos.' });
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado. Por favor, verifica el correo electrónico proporcionado.' });
        }

        if(user.ban){
            return res.status(401).json({ error: 'Usuario Baneado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta. Por favor, verifica tu contraseña.' });
        } else {
            const hashedPassword = await hashPassword(newPassword);
            
            const [updatedUser] = await Users.update(
                { password: hashedPassword },
                { where: { email } }
            );
            if (updatedUser > 0) {
                return res.json({ success: 'Contraseña actualizada exitosamente' });
            } else {
                return res.status(404).json({ error: 'No se pudo actualizar la contraseña' });
            }
        }


    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al actualizar la cuenta. Por favor, intenta de nuevo más tarde.' });
    }
};

module.exports = putUser;
