const { Likes, Users } = require('../../db');

//Este controlador es para guardar la playlist que el usuario le ha dado like(me gusta)

const postSavingPlaylist = async (req, res) => {

    const { userId, playlistId } = req.body;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }
        const user = await Users.findOne({
            where: {
              id: userId
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
    
        if(user.ban){
            return res.status(400).json({ error: 'El usuario esta baneado' });
        }

        const existingLike = await Likes.findOne({
            where: {
                UsersID: userId,
                PlaylistID: playlistId
            }
        });

        if (existingLike) {
            return res.status(400).json({ error: 'El usuario ya tiene guardada esa playlist' });
        }

        const newLike = await Likes.create({
            UsersID: userId,
            PlaylistID: playlistId
        });

        return res.status(200).json(newLike);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postSavingPlaylist;