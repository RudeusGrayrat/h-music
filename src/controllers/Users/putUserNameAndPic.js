const { Users } = require("../../db");



const putUserNameAndPic = async (req, res) => {

    const { name, image, email } = req.body;
    console.log(req.body);

    try {

        const user = await Users.findOne({ 
            where: { email } 
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        if(user.name !== name || user.image !== image) {
            const updatedUser = await Users.update(
                { name, image },
                { where: { email } }
            );
            if (updatedUser > 0) {
                return res.status(200).json(updatedUser);
            } else {
                return res.status(404).json({ error: 'No se pudo actualizar el usuario' });
            }
        }
        
    } catch (error) {

        return res.status(500).json({ error: error.message });
    }

}



module.exports = putUserNameAndPic;