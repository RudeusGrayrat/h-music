const { Playlists, PlaylistDetails, Songs, Artists, Genres, Users } = require("../../db");

const addSongToFavorite = async(req,res) => {

    try {
        
    const { userId, songId  } = req.body;

    const user = await Users.findOne({
        where: {
          id: userId
        }
    });

    if(user.ban){
        return res.status(400).json({ error: 'El usuario esta baneado' });
    }

    const song = await Songs.findOne({
        where: {
          id: songId
        },
        include: [Artists, Genres]
    });

    if (!song) {
        return res.status(400).json({ error: 'La cancion no existe' });
    }

    const favPlaylist = await Playlists.findOne({
        where: {
          name: 'Favoritos',
          UsersID: userId
        }
    });

    if (!favPlaylist) {
        return res.status(400).json({ error: 'La playlist no existe' });
    }

    const playlistId = favPlaylist.dataValues.id;

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
        return res.status(500).json({ error: error.message });
    }

}

module.exports = addSongToFavorite;