const { Playlists } = require('../../db');

//este controlador es para eliminar una playlist, toma el id de la playlist a eliminar por params y la 
//elimina.
const deletePlaylist = async (req, res) => {
    
    const { id } = req.params;

    try {
        const playListToDelete = await Playlists.findByPk(id);

        

        if (!playListToDelete) {    
            return res.status(404).json({ error: 'La playlist no existe' });
        }

        await playListToDelete.destroy();

        return res.status(200).json({ message: 'La playlist se elimino correctamente' });
        
    } catch (error) {

        return res.status(500).json({ error: error.message });
    }

}

module.exports = deletePlaylist; 