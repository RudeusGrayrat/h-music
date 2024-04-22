const { Songs, Artists, Genres } = require("../../db");

const getSongById = async (req, res) => {

    try {
        const { idSong } = req.params

        const song = await Songs.findOne({
            where: { id: idSong },
            include: [
                {
                    model: Artists,
                    attributes: ['name'],
                },
                {
                    model: Genres,
                    attributes: ['name'],
                },
            ],
        })

        res.status(200).json(song);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la canción' });
    }
};

module.exports = getSongById;
