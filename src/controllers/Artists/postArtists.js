const { Artists } = require('../../db');

const postArtists = async (req, res) => {
    try {
        const { name, image } = req.body;

        // Crear la nueva canción
        const newArtists = await Artists.create({
            name,
            image
        });

        return res.status(200).json(newArtists);
    } catch (error) {
        // Manejar errores de validación de Sequelize
        console.error(error);
        res.status(500).json({ error: 'Error al crear una nueva canción' });

    }
};

module.exports = postArtists;
