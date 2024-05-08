const { Songs, Artists, Genres, Albums } = require("../../db");
const { Op } = require("sequelize");

const getSongByTitle = async (req, res) => {
    try {
        const { name } = req.params;

        const artists = await Artists.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['id', 'name', 'image'],
        });

        const albums = await Albums.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['name', 'image']
        });

        const genres = await Genres.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['name'],
        });

        const songs = await Songs.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${name}%` } },
                    { '$Artist.name$': { [Op.iLike]: `%${name}%` } },
                    { '$Album.name$': { [Op.iLike]: `%${name}%` } },
                    { '$Genre.name$': { [Op.iLike]: `%${name}%` } }
                ]
            },
            include: [
                { model: Artists, attributes: ['name'] },
                { model: Albums, attributes: ['name', 'image'] },
                { model: Genres, attributes: ['name'] }
            ]
        });

        res.status(200).json({ songs, artists, genres, albums });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información' });
    }
};

module.exports = getSongByTitle;
