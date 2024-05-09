const { Albums, Songs } = require('../../db.js');

const getAlbumById = async (req, res) => {
    const { id } = req.params;

    try {
        const album = await Albums.findByPk(id, {
            include: {
                model: Songs,
                where: { AlbumsID: id }
            }
        });

        if (!album) {
            return res.status(404).json({ message: 'No se encontró ningún álbum con el ID proporcionado' });
        }

        return res.status(200).json(album);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = getAlbumById;
