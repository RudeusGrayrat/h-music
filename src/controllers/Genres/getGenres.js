const { Genres } = require('../../db');

const getGenres = async (req, res) => {
    try {
        const allGenres = await Genres.findAll();

        if (allGenres.length === 0) {
            const mensaje = "No hay generos";

            return res.status(200).json(mensaje);
        }

        return res.status(200).json(allGenres);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al traer generos' });

    }
};

module.exports = getGenres;
