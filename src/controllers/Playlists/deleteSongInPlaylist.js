const { PlaylistDetails } = require('../../db');

//este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
//el id de la playlist por params.
const deleteSongInPlaylist = async (req, res) => {
  const { songId, playlistId } = req.params;

  try {
    const songToDelete = await PlaylistDetails.findOne({
      where: {
        SongsID: songId,
        PlaylistID: playlistId,
      },
    });

    if (!songToDelete) {
      return res.status(404).json({ message: 'La canción no se encuentra en la playlist' });
    }

    
    await songToDelete.destroy();

    return res.status(200).json({ message: 'La canción se eliminó correctamente de la playlist' });

  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteSongInPlaylist;