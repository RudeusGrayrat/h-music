const { PlaylistDetails } = require('../../db');

//este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
//el id de la playlist por params.
const deleteSongInPlaylist = async (req, res) => {
  const { id } = req.query;

  try {
    const songToDelete = await PlaylistDetails.findOne({
      where: {
        id: id,
      },
    });

    if (!songToDelete) {
      return res.status(404).json({ message: 'La canción no se encuentra en ninguna playlist' });
    }

     await songToDelete.destroy();

    return res.status(200).json({ message: 'La canción se eliminó correctamente de la playlist' });

  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteSongInPlaylist;