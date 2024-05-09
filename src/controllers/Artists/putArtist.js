const { Artists } = require('../../db');

const putArtist = async (req, res) => {
    const { name, image } = req.body;
    const { id } = req.params;
    
    try {
        const artist = await Artists.findOne({ where: { id } });

        if (!artist) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'No se pudo encontrar un artista con el ID proporcionado', 
                errorCode: 'ARTIST_NOT_FOUND' 
            });
        }

        if (name && artist.name !== name) {
            await Artists.update({ name }, { where: { id } });
        }

        if (image && artist.image !== image) {
            await Artists.update({ image }, { where: { id } });
        }

        const updatedArtist = await Artists.findOne({ where: { id } });

        return res.status(200).json({ 
            status: 'success', 
            data: updatedArtist
        });
        
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Ocurrió un error interno del servidor', 
            errorCode: 'INTERNAL_SERVER_ERROR' 
        });
    }
}

module.exports = putArtist;
