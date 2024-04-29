const { Songs, Artists, Genres } = require("../../db");

const getSongsByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;

        const songs = await Songs.findAll({
            include: [
                {
                    model: Artists,
                    attributes: ['name'],
                },
                {
                    model: Genres,
                    attributes: ['name'],
                    where: { id: genreId },
                },
            ],
        });

        if (songs.length === 0) {
            return res.status(404).json({ message: "No se encontraron canciones para este género" });
        }

        return res.status(200).json(songs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las canciones por género' });
    }
};

module.exports = getSongsByGenre;
