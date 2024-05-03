const { Users } = require('../../db');
const { hashPassword } = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');



const postUsers = async (req, res) => {
    try {

        const { name, image, email, password, provider } = req.body;
        console.log(req.body);
        let hashedPassword;
        
        
        if (!name && !email) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        if(password){ 
            hashedPassword = await hashPassword(password);
        }

        // Verificar si el usuario ya existe
        const existingUser = await Users.findOne({ where: { email } });

        if (existingUser && !provider) {
            console.log('El usuario ya existe');
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        if(provider === 'google' && existingUser){
            const token = jwt.sign({ id: existingUser.id }, 'tu_secreto', { expiresIn: '1h' }); // Reemplaza 'tu_secreto' con tu clave secreta
            existingUser.token = token;
            return res.status(201).json({
                message: 'secion iniciada exitosamente',
                user: existingUser,
            });
        }


        const newUser = await Users.create({
            name, 
            image,
            email, 
            password: hashedPassword,
        });

        if(provider === 'google'){
            await newUser.update(
                { esta_verificado: true }, 
                { where: { id: newUser.id } }
            );
            const token = jwt.sign({ id: newUser.id }, 'tu_secreto', { expiresIn: '5h' }); // Reemplaza 'tu_secreto' con tu clave secreta
            newUser.token = token;

            return res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: newUser,
            });
        }

        return res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un nuevo usuario', message: error.message });
    }
};

module.exports = postUsers;
