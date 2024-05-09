const { Albums, Songs } = require('../../db.js');

const getAlbumById = async (req, res) => {
    const { id } = req.params;

    try {
        const album = await Albums.findOne({ 
            where: { id },
            include: [{ model: Songs }] 
        });

        if (!album) {
            const mensaje = "No se encontró ningún álbum con el ID proporcionado";
            return res.status(404).json({ mensaje });
        } else {

            const respuesta = {
                album: {
                    id: album.id,
                    name: album.name,
                    image: album.image,
                    Songs: album.Songs || []
                }
            };
            return res.status(200).json(respuesta);
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getAlbumById;
