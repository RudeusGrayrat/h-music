const { Playlists, Users } = require('../../db');

//este controlador es para crear una playlist nueva

const postPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la playlist es obligatorio' });
    }

    const user = await Users.findOne({
        where: {
          id: userId
        }
      });
      
      if (!user) {
        return res.status(400).json({ error: 'El usuario no existe' });
      }

    const amountOfPlaylists = await Playlists.findAll({
      where: {
        UsersID: userId
      }
    });

    if(user.rol !== 'premium' && user.rol !== 'admin' && amountOfPlaylists.length >= 5) {
      return res.status(400).json({ error: 'No puedes crear mas de 5 playlists' });
    }

    const newPlaylist = await Playlists.create({
      name: name,
      UsersID: userId, 
    });

    return res.status(200).json(newPlaylist);
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = postPlaylist;
