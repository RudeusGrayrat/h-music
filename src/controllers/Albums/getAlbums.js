const { Albums } = require('../../db.js');


const getAlbums = async (req, res) => {

    try {
        
        const allAlbums = await Albums.findAll();

        if (allAlbums.length === 0) {
            const mensaje = "No hay albums";
            return res.status(200).json(mensaje);
        } else {
            return res.status(200).json(allAlbums);
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


module.exports = getAlbums;