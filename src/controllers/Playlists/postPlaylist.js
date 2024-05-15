const { Playlists, Users } = require('../../db');

//este controlador es para crear una playlist nueva

const postPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;


    if (!name) {
      return res.status(400).json({ error: 'El nombre de la playlist es obligatorio' });
    }

    let incomingName = name.toLowerCase();
        const primeraLetraMayuscula = incomingName.charAt(0).toUpperCase();
        const cadenaModificada = primeraLetraMayuscula + incomingName.slice(1);
        if(cadenaModificada === "Favoritos") {
            return res.status(422).json({ error: "El nombre 'Favoritos' está reservado y no puede ser usado para una playlist." });
        }

    // Verificar que se proporcionó un userId
    if (!userId) {
      return res.status(422).json({ error: 'Falta el ID del usuario. Por favor, proporciona un ID de usuario válido.' });
    }
    const user = await Users.findOne({
        where: {
          id: userId
        }
      });
      
    if (!user) {
      return res.status(404).json({ error: 'No se encontró el usuario con el ID proporcionado.' });
    }

    if(user.ban){
      return res.status(403).json({ error: 'El usuario está baneado y no puede crear playlists.' });
    }

    const amountOfPlaylists = await Playlists.findAll({
      where: {
        UsersID: userId
      }
    });

    if(user.rol !== 'premium' && user.rol !== 'admin' && amountOfPlaylists.length >= 5) {
      return res.status(403).json({ error: 'Has alcanzado el límite de playlists. Los usuarios no premium no pueden crear más de 5 playlists.' });
    }

    const newPlaylist = await Playlists.create({
      name: name,
      UsersID: userId, 
    });

    return res.status(200).json(newPlaylist);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor al crear la playlist' });
  }
};

module.exports = postPlaylist;
