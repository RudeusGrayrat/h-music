const { Users } = require("../../db");



const putUserNameAndPic = async (req, res) => {

    const { name, image} = req.body;
    const { id } = req.params;
    console.log(req.body);

    try {

        const user = await Users.findOne({ 
            where: { id } 
        });
        console.log(user);

        if (!user) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'No se pudo encontrar un usuario con el ID proporcionado', 
                errorCode: 'USER_NOT_FOUND' 
            });
        }

        let fieldsToUpdate = {};
        if (name && user.name !== name) {
            fieldsToUpdate.name = name;
        }
        if (image && user.image !== image) {
            fieldsToUpdate.image = image;
        }
    
        if (Object.keys(fieldsToUpdate).length > 0) {
            const updatedUser = await Users.update(
                fieldsToUpdate,
                { where: { id } }
            );
            if (updatedUser > 0) {
                const newUser = await Users.findOne({ where: { id } });
                return res.status(200).json({ 
                    status: 'success', 
                    data: newUser
                });
            } else {
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'La actualización del usuario falló por alguna razón', 
                    errorCode: 'UPDATE_FAILED' 
                });
            }
        } else {
            return res.status(400).json({ 
                status: 'error', 
                message: 'No se proporcionaron campos para actualizar', 
                errorCode: 'NO_UPDATE_FIELDS' 
            });
        }
        
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Ocurrió un error interno del servidor', 
            errorCode: 'INTERNAL_SERVER_ERROR' 
        });
    }

}



module.exports = putUserNameAndPic;