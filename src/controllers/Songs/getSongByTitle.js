const { Songs, Artists, Genres, Albums } = require("../../db");
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
                {
                    model: Albums,
                    attributes: ['name'],
                },
            ],
        });

        const artists = await Artists.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['name', 'image'],
        });

        const genres = await Genres.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['name'],
        });

        const albums = await Albums.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['name', 'image'],
        });

        res.status(200).json({ songs, artists, genres, albums });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información' });
    }
};

module.exports = getSongByTitle;
