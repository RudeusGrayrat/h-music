const { PlaylistDetails, Songs, Playlists } = require('../../db');

//este controlador es para consulta el detalles de una playlist especifica
//que requiera el usuario

const getPlaylistDetail = async (req, res) => {
    const { id } = req.params;


    if (!id) { 
        console.log('Falta el ID de la playlist en la solicitud');
        return res.status(400).json({ error: 'Falta el ID de la playlist en la solicitud' });
    }

    const playlist = await Playlists.findByPk(id);
    console.log('playlist',playlist);

    if (!playlist) {
        console.log(`No se encontró una playlist con el ID ${id}`);
        return res.status(404).json({ error: `No se encontró una playlist con el ID ${id}` });
    }

    try {
        const playlistDetail = await PlaylistDetails.findAll({
            where: {
                PlaylistID: id
            },
        });
        
            const response = {
                dataValues: {
                    id: playlist.id,
                    name: playlist.name,
                    UsersID: playlist.UsersID,
                    image: playlist.image,
                },
                playlistDetail: playlistDetail
            };
            
            return res.status(200).json(response);
        

        if (playlistDetail.length === 0) {
            console.log('No se encontraron detalles para esta playlist');
            return res.status(404).json({ error: 'No se encontraron detalles para esta playlist' });
        } else {
        }
    } catch (error) {
        console.error('Error al buscar los detalles de la playlist:', error);
        return res.status(500).json({ error: 'Error interno del servidor al buscar los detalles de la playlist' });
    }
}

module.exports = getPlaylistDetail;