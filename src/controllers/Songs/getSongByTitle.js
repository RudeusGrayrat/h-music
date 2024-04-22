const { Songs, Artists, Genres } = require("../../db");
const { Op } = require("sequelize");

const getSongByTitle = async (req, res) => {
    try {
        const { name } = req.params;

        const songs = await Songs.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
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
        });

        res.status(200).json(songs || []);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las canciones por título' });
    }
};

module.exports = getSongByTitle;
