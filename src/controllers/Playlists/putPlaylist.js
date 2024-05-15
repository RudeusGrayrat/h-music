const { Playlists } = require("../../db");

//este controlador es para editar una playlist, esta preparado para editar el nombre o la imagen o ambos
//recibe por body el nombre o la imagen y el id de la playlist a editar, y actualiza dependiendo de lo que
//recibe.
const putPlaylist = async (req, res) => {
    let {name, image, id} = req.body;

    try {

        const playlistToEdit = await Playlists.findOne({ where: { id } });
        
        if(!name && !image) {
            return res.status(400).json({ message: "Faltan datos necesarios para actualizar la playlist" });
        }

        
        if (!playlistToEdit) {
            return res.status(404).json({ message: "La playlist no existe" });
        }
        
        if(!name || typeof name !== "string" || typeof name === undefined) {
            name = playlistToEdit.name;
        }       

        if(playlistToEdit.name === "Favoritos") {
            return res.status(400).json({ message: "No puedes editar la playlist Favoritos" });
        }

        
        let incomingName = name.toLowerCase();
        const primeraLetraMayuscula = incomingName.charAt(0).toUpperCase();
        const cadenaModificada = primeraLetraMayuscula + incomingName.slice(1);
        if(cadenaModificada === "Favoritos") {
            return res.status(400).json({ message: "No puedes colocarle el nombre de Favoritos a una playlist" });
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
        const errorDetails = {
            error: {
                message: error.message,
                type: error.name,
                stackTrace: error.stack
            }
        };
    
        return res.status(500).json(errorDetails);
    }
}

module.exports = putPlaylist;
