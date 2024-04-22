const { Artists } = require('../../db');

const getArtists = async (req, res) => {
    try {
        const allArtists = await Artists.findAll();

        if (allArtists.length === 0) {
            const mensaje = "No hay artistas";

            return res.status(200).json(mensaje);
        }

        return res.status(200).json(allArtists);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al traer artistas' });

    }
};

module.exports = getArtists;
