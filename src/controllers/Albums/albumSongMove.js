const { Albums, Songs } = require("../../db");

const albumSongMove = async (req, res) => {
    const {songsiD } = req.query;

    try {
        if (!songsiD) return res.status(400).json({ error: "Faltan datos" });
        const album = await Albums.findByPk(albumsId);
        if (!album) return res.status(404).json({ error: "Album no encontrado" });
        const song = await Songs.findOne({
            where: {
                id: songsiD
            }
        });
        if (!song) return res.status(404).json({ error: "Cancion no encontrada" });
        await song.update({ AlbumsID: 1 });

        return res.status(200).json({ message: "Cancion agregada al album" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = albumSongMove;