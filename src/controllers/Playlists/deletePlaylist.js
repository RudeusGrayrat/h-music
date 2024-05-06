const { Playlists } = require('../../db');

//este controlador es para eliminar una playlist, toma el id de la playlist a eliminar por params y la 
//elimina.
const sendErrorResponse = (res, status, message) => {
    console.error(message);
    return res.status(status).json({ error: message });
}

const deletePlaylist = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return sendErrorResponse(res, 400, 'Falta el ID de la playlist en la solicitud');
    }

    try {
        const playListToDelete = await Playlists.findOne({ where: { id } });

        if (!playListToDelete) {    
            return sendErrorResponse(res, 404, 'La playlist no existe');
        }

        await playListToDelete.destroy();

        return res.status(200).json({ message: 'La playlist se elimino correctamente' });
        
    } catch (error) {
        // Manejar diferentes tipos de errores de manera más específica
        if (error instanceof ValidationError) {
            return sendErrorResponse(res, 400, error.message);
        } else if (error instanceof ForeignKeyConstraintError) {
            return sendErrorResponse(res, 409, 'La playlist no puede ser eliminada porque está siendo referenciada por otras entidades');
        } else {
            return sendErrorResponse(res, 500, error.message);
        }
    }
}

module.exports = deletePlaylist;