const { Genres } = require('../../db');

const postGenres = async (req, res) => {
    try {
        const { name } = req.body;

        const newGenres = await Genres.create({
            name,
        });

        return res.status(200).json(newGenres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear nuevo genero' });

    }
};

module.exports = postGenres;
