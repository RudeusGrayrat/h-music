const { Albums, Songs } = require("../../db");

const addSongsToAlbum = async (req, res) => {
    //este controlador a pesar de que dice addSongs es un put, ya que edita el modelo de la canción para cambiarle
    //el id del album, ya que es por donde se referencia, en este caso, la cancion solo puede tener un album.

    const { albumsId, songsiD } = req.query;
    try {

        if (!albumsId || !songsiD) return res.status(400).json({ error: "Faltan datos" });

        const album = await Albums.findByPk(albumsId);

        if (!album) return res.status(404).json({ error: "Album no encontrado" });
        
        const song = await Songs.findOne({
            where: {
                id: songsiD
            }
        });
        if (!song) return res.status(404).json({ error: "Cancion no encontrada" });

        await song.update({ AlbumsID: albumsId });
        
        return res.status(200).json({message: "Cancion agregada al album por defecto"});

        
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}


module.exports = addSongsToAlbum;