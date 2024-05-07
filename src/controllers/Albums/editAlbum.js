const { Albums } = require("../../db");


const editAlbum = async (req, res) => {

    const { name, image, id} = req.body; //id del album que se va a editar.

    try {
        const album = await Albums.findByPk(id);

        if (!album) {
            return res.status(404).json({ message: "El album no existe" });
        }

        if(!name && !image) {
            return res.status(400).json({ message: "Faltan datos necesarios para actualizar el album" });
        }
        if(name && !image) {
            await album.update({
                name
            });
            return res.status(200).json({message: "Nombre del album actualizado con exito"});
        }
        if(!name && image) {
            await album.update({
                image
            });
            return res.status(200).json({message: "Imagen del album actualizada con exito"});
        }
        if(name && image){
            await album.update({
                name,
                image
            })
            return res.status(200).json({message: "tanto el nombre como la imagen del album fueron actualizados con exito"});
        }
        

        
    } catch (error) {

        res.status(500).json({ error: error.message });
    }

}


module.exports = editAlbum;