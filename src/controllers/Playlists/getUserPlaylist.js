const { Playlists, Users } = require('../../db.js');

//este controlador es para traer las playlist del usuario que consulta
const getUserPlaylist = async (req, res) => {
    const { userId } = req.params;

    try {
    if (!userId) {
        return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    const user = await Users.findOne({
        where: {
          id: userId
        }
    });

    if(user.ban){
        return res.status(400).json({ error: 'El usuario esta baneado' });
    }

    
        const playlists = await Playlists.findAll({
            where: {
                UsersID: userId  
            },
            include: [
                {
                    model: Users,
                    attributes: ['name']
                },
            ]
        });

        if (playlists.length === 0) {
            return res.status(404).json({ error: 'No hay playlists disponibles para este usuario' });
        } else {
            return res.status(200).json(playlists);
        }

} catch (error) {
    console.error('Error al buscar las playlists:', error);
    return res.status(500).json({ error: 'Error interno del servidor al buscar las playlists' });
}
};

module.exports = getUserPlaylist;