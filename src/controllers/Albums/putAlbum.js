const { Albums } = require('../../db');

const putAlbum = async (req, res) => {
    const { name, image } = req.body;
    const { id } = req.params;
    
    try {
        const album = await Albums.findOne({ where: { id } });

        if (!album) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'No se pudo encontrar un álbum con el ID proporcionado', 
                errorCode: 'ALBUM_NOT_FOUND' 
            });
        }

        if (name && album.name !== name) {
            await Albums.update({ name }, { where: { id } });
        }

        if (image && album.image !== image) {
            await Albums.update({ image }, { where: { id } });
        }

        const updatedAlbum = await Albums.findOne({ where: { id } });

        return res.status(200).json({ 
            status: 'success', 
            data: updatedAlbum
        });
        
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Ocurrió un error interno del servidor', 
            errorCode: 'INTERNAL_SERVER_ERROR' 
        });
    }
}

module.exports = putAlbum;
