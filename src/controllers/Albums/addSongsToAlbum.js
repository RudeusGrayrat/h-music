const { Songs } = require("../../db");

const addSongsToAlbum = async (req, res) => {
    const { AlbumsID } = req.params;
    const { id: songId } = req.body;

    try {
        if (!AlbumsID || !songId) {
            console.log("Faltan datos en la solicitud");
            return res.status(400).json({ error: "Faltan datos" });
        }

        const song = await Songs.findByPk(songId);
        if (!song) {
            console.log("Canción no encontrada");
            return res.status(404).json({ error: "Canción no encontrada" });
        }

        await song.update({ AlbumsID });

        return res.status(200).json({ message: "Canción movida al álbum especificado" });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = addSongsToAlbum;
