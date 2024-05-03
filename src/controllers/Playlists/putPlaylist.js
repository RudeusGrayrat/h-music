const { Playlists } = require("../../db");

//este controlador es para editar una playlist, esta preparado para editar el nombre o la imagen o ambos
//recibe por body el nombre o la imagen y el id de la playlist a editar, y actualiza dependiendo de lo que
//recibe.
const putPlaylist = async (req, res) => {

    const {name, image, id} = req.body;

    try {

        const playlistToEdit = await Playlists.findOne({
            where: {
                id
            }
        });

        if (!playlistToEdit) {
            return res.status(404).json({ message: "La playlist no existe" })
        }

        if(!name && !image) {
            return res.status(400).json({ message: "Faltan datos necesarios para actualizar la playlist" })
        }

        if(name && !image) {
            await playlistToEdit.update({
                name
            });
            return res.status(200).json({message: "Nombre de la playlist actualizada con exito"})
        }

        if(!name && image) {
            await playlistToEdit.update({
                image
            });
            return res.status(200).json({message: "Imagen de la playlist actualizada con exito"})
        }

         await playlistToEdit.update({
            name,
            image
        });

        return res.status(200).json({message: "Tanto el nombre como la imagen fueron actualizados con exito"})
    

    } catch (error) {
    
        return res.status(500).json({ error: error.message })
        
    }

}

module.exports = putPlaylist;