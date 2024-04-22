const { Songs, Artists, Genres, Albums } = require('../../db');

const postSongs = async (req, res) => {
    try {
        const { name, image, pathMusic, ArtistID, GenreID, AlbumsID } = req.body;

        const existingSongs = await Songs.findOne({
            where: {
                name: name,
                ArtistID: ArtistID
            },
            include: [
                { model: Artists, attributes: ['name'] },
                { model: Genres, attributes: ['name'] },
                { model: Albums, attributes: ['name'] }
            ]
        });

        if (existingSongs) {
            return res.status(400).json({
                error: 'Ya existe una canción con ese nombre y artista.'
            });
        }

        const newSong = await Songs.create({
            image,
            name,
            pathMusic,
            ArtistID,
            GenreID,
            AlbumsID
        });

        const artist = await Artists.findByPk(ArtistID, { attributes: ['name'] });
        const genre = await Genres.findByPk(GenreID, { attributes: ['name'] });
        const album = await Albums.findByPk(AlbumsID, { attributes: ['name'] });

        const responseData = {
            id: newSong.id,
            image: newSong.image,
            name: newSong.name,
            pathMusic: newSong.pathMusic,
            Artist: artist,
            Genre: genre,
            Album: album
        };

        return res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear una nueva canción' });
    }
};

module.exports = postSongs;
