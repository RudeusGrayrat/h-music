const { PlaylistDetails, Songs, Playlists  } = require('../../db');

//este controlador es para consulta el detalles de una playlist especifica
//que requiera el usuario

const getPlaylistDetail = async (req, res) => {
    const { id } = req.params;
    console.log('getPlaylistDetail: ',id);


    if (!id) { 
        return res.status(400).json({ error: 'Falta el ID de la playlist en la solicitud' });
    }

    const playlist = await Playlists.findByPk(id);

    if (!playlist) {
        return res.status(404).json({ error: `No se encontró una playlist con el ID ${id}` });
    }

    try {
        const playlistDetail = await PlaylistDetails.findAll({
            where: {
                PlaylistID: id
            },
            include: [
                {
                    model: Songs
                }
            ]
        });

        if (playlistDetail.length === 0) {
            return res.status(404).json({ error: 'No se encontraron detalles para esta playlist' });
        } else {
            return res.status(200).json(playlistDetail);
        }
    } catch (error) {
        console.error('Error al buscar los detalles de la playlist:', error);
        return res.status(500).json({ error: 'Error interno del servidor al buscar los detalles de la playlist' });
    }
}

module.exports = getPlaylistDetail;