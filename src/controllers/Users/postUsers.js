const { Users } = require('../../db');
const { hashPassword } = require('../../utils/bcrypt');

const postUsers = async (req, res) => {
    try {
        const { name, image, email, password } = req.body;
        
          const hashedPassword = await hashPassword(password);

        const newUser = await Users.create({
            name, 
            image,
            email, 
            hashedPassword
        });

        return res.status(201).json(newUser);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un nuevo usuario' });
    }
};

module.exports = postUsers;
