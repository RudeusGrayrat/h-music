const { Users } = require("../../db");

const changeVerificationStatus = async (req, res) => {
    const {id, token} = req.body;


    try {
        const user = await Users.findOne({
            where: {
                id
            }
        });

    
        if (!user) {
            return res.status(404).json({error: "Usuario no existe en la bdd"});
        }
    
        if (user.verification_token !== token) {
            return res.status(400).json({error: "Token de verificacion incorrecto"});
        }
    
        if(user.id === id && user.verification_token === token){

            const updateUser = await Users.update(

                { esta_verificado: true },
                { where: { id } }
              );

        res.status(200).json(updateUser);
    }
    
} catch (error) {

    return res.status(500).json({error: error.message});
    
}

}


module.exports = changeVerificationStatus;