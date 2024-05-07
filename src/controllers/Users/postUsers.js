const { Users } = require('../../db');
const { hashPassword } = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const secret = JWT_SECRET_KEY || 'tu_secreto';

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

        if (existingUser && provider !== 'google') {
            console.log('El usuario ya existe');
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        if(provider === 'google' && existingUser){
            const token = jwt.sign({ id: existingUser.id }, secret, { expiresIn: '5h' }); 

            return res.status(201).json({
                message: 'secion iniciada exitosamente',
                user: existingUser,
                token,
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
            const token = jwt.sign({ id: newUser.id }, secret, { expiresIn: '5h' });

            return res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: newUser,
                token,
            });
        }

        return res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un nuevo usuario', message: error.message });
    }
};

module.exports = postUsers;
