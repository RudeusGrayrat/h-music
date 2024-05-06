const { PlaylistDetails, Songs, Artists, Genres } = require('../../db');

const postSongToPlaylist = async(req,res) => {
    try {
        const { playlistId, songId } = req.body;

        const song = await Songs.findOne({
            where: {
              id: songId
            },
            include: [Artists, Genres]
        });


        if (!song) {
            return res.status(400).json({ error: 'La canción no existe' });
        }

        const playlistDetails = await PlaylistDetails.findOne({
            where: {
              PlaylistID: playlistId,
              SongsID: songId
            }
        });

        if (playlistDetails) {
            return res.status(400).json({ error: 'La canción ya está en la playlist' });
        } else {
            const newPlaylistDetails = await PlaylistDetails.create({
                PlaylistID: playlistId,
                SongsID: songId,
                ArtistName: song.Artist.dataValues.name, 
                GenreName: song.Genre.dataValues.name,
                SongsImage: song.dataValues.image,
                SongsName: song.dataValues.name
            });
            return res.status(200).json(newPlaylistDetails); 
        }
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

module.exports = postSongToPlaylist;