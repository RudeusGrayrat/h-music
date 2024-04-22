const { PlaylistDetails } = require('../../db');

//este controlador es para agregar canciones a una playlist
const postSongToPlaylist = async(req,res) => {
    
    try {
        const { playlistId, songId } = req.body;

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
                SongsID: songId
              });
             return res.status(200).json(newPlaylistDetails); 
          }
          
          
    } catch (error) {
        
        return res.status(400).json({error:error.message});
    }
}

module.exports = postSongToPlaylist;