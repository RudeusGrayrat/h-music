const { Likes } = require('../../db');

//Este controlador es para guardar la playlist que el usuario le ha dado like(me gusta)

const postSavingPlaylist = async (req, res) => {

    const { userId, playlistId } = req.body;

    try {
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