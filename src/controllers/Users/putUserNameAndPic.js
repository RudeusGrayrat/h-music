const { Users } = require("../../db");

const putUserNameAndPic = async (req, res) => {
    const { name, image } = req.body;
    const { id } = req.params;
    
    try {
        const user = await Users.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'No se pudo encontrar un usuario con el ID proporcionado', 
                errorCode: 'USER_NOT_FOUND' 
            });
        }
        if (name && user.name !== name) {
            await Users.update({ name }, { where: { id } });
        }

        if (image && user.image !== image) {
            await Users.update({ image }, { where: { id } });
        }

        const updatedUser = await Users.findOne({ where: { id } });

        return res.status(200).json({ 
            status: 'success', 
            data: updatedUser
        });
        
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Ocurrió un error interno del servidor', 
            errorCode: 'INTERNAL_SERVER_ERROR' 
        });
    }
}

module.exports = putUserNameAndPic
