const { Albums } = require("../../db");


const postAlbums = async (req, res) => {

    try {
        const { name, image } = req.body;
        const newAlbum = await Albums.create({
            name,
            image
        });
        res.status(200).json(newAlbum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postAlbums