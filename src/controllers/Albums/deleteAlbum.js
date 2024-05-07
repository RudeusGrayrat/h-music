const { Albums } = require("../../db");


const deleteAlbum = async (req, res) => {
    //controlador para borrar un album, recibe el id del album por params, lo busca y elimina.

    const { id } = req.params;

    try {

        const album = await Albums.findByPk(id);

        if (!album) {
            return res.status(404).json({ message: "El album no existe" });
        }

        await album.destroy();
        return res.status(200).json({ message: "Album eliminado con exito" });
        
    } catch (error) {

        return res.status(500).json({ error: error.message });
    }

}


module.exports = deleteAlbum;
