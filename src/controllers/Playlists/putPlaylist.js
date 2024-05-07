const { Playlists } = require("../../db");

//este controlador es para editar una playlist, esta preparado para editar el nombre o la imagen o ambos
//recibe por body el nombre o la imagen y el id de la playlist a editar, y actualiza dependiendo de lo que
//recibe.
const putPlaylist = async (req, res) => {
    const {name, image, id} = req.body;

    try {
        const playlistToEdit = await Playlists.findOne({ where: { id } });

        if (!playlistToEdit) {
            return res.status(404).json({ message: "La playlist no existe" });
        }

        if(!name && !image) {
            return res.status(400).json({ message: "Faltan datos necesarios para actualizar la playlist" });
        }

        let updatedPlaylist;
        if(name && !image) {
            updatedPlaylist = await playlistToEdit.update({ name }, { returning: true });
            return res.status(200).json({message: "Nombre de la playlist actualizada con exito", name: updatedPlaylist.name});
        }

        if(!name && image) {
            updatedPlaylist = await playlistToEdit.update({ image }, { returning: true });
            return res.status(200).json({message: "Imagen de la playlist actualizada con exito", image: updatedPlaylist.image});
        }

        updatedPlaylist = await playlistToEdit.update({ name, image }, { returning: true });
        return res.status(200).json({message: "Tanto el nombre como la imagen fueron actualizados con exito", name: updatedPlaylist.name, image: updatedPlaylist.image});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = putPlaylist;