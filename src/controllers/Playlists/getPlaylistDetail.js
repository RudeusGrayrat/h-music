const { PlaylistDetails, Songs, Playlists } = require('../../db');

const sendErrorResponse = (res, status, message) => {
    console.error(message);
    return res.status(status).json({ error: message });
}

const getPlaylistDetail = async (req, res) => {
    const { id } = req.params;

    if (!id) { 
        return sendErrorResponse(res, 400, 'Falta el ID de la playlist en la solicitud');
    }

    const playlist = await Playlists.findByPk(id);

    if (!playlist) {
        return sendErrorResponse(res, 404, `No se encontró una playlist con el ID ${id}`);
    }

    try {
        const playlistDetails = await PlaylistDetails.findAll({
            where: {
                PlaylistID: id
            },
        });

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
        return sendErrorResponse(res, 500, 'Error interno del servidor al buscar los detalles de la playlist');
    }
}

module.exports = getPlaylistDetail;
