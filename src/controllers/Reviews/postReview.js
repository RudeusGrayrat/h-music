const { Reviews, Users } = require('../../db');

const insertReview = async (req, res) => {
  try {
    const { content, punctuation, songId, userId } = req.body;

    // Verificar si el contenido y la puntuación están presentes
    if (!content || !punctuation || !songId || !userId) {
      return res.status(400).json({ error: 'Se requieren contenido, puntuación, songId y userId para insertar una revisión' });
    }

    // Verificar si el usuario existe
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }

    // Insertar la revisión en la base de datos
    const newReview = await Reviews.create({
      content: content,
      punctuation: punctuation,
      SongsID: songId,
      UsersID: userId
    });

    return res.status(200).json(newReview);
  } catch (error) {
    console.error('Error al insertar la revisión:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = insertReview;
