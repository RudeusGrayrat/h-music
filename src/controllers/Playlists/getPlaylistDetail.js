const { PlaylistDetails, Songs, Playlists } = require('../../db');

const getPlaylistDetail = async (req, res) => {
    const { id } = req.params;

    if (!id) { 
        return res.status(400).json({ error: 'Falta el ID de la playlist en la solicitud' });
    }

    const playlist = await Playlists.findByPk(id);

    if (!playlist) {
        return res.status(404).json({ error: `No se encontró una playlist con el ID ${id}` });
    }

    try {
        const playlistDetails = await PlaylistDetails.findAll({
            where: {
                PlaylistID: id
            },
        });
        
        if (playlistDetails.length === 0) {
            return res.status(200).json('No se encontraron detalles para esta playlist');
        }

        const songs = await Promise.all(playlistDetails.map(detail => Songs.findByPk(detail.SongsID)));

        const response = {
            dataValues: {
                id: playlist.id,
                name: playlist.name,
                UsersID: playlist.UsersID,
                image: playlist.image,
            },
            playlistDetails,
            songs
        };
        
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al buscar los detalles de la playlist:', error);
        return res.status(500).json({ error: 'Error interno del servidor al buscar los detalles de la playlist' });
    }
}

module.exports = getPlaylistDetail;