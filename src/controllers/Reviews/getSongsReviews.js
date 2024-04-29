const { Reviews, Users, Songs } = require('../../db');

const getReviewsBySongId = async (req, res) => {
    const { songId } = req.params;

    try {
        const reviews = await Reviews.findAll({
            where: { SongsID: songId },
            include: [
                {
                    model: Users,
                    attributes: ['name', 'image']
                }
            ]
        });

        // Formatear la propiedad 'punctuation' en cada revisión
        const formattedReviews = reviews.map((review) => ({
            ...review.toJSON(), // Convertir el objeto Sequelize a un objeto JSON
            punctuation: formatPunctuation(review.punctuation)
        }));

        return res.status(200).json(formattedReviews);
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrió un error al buscar las revisiones de la canción' });
    }
}

// Función para formatear la puntuación
const formatPunctuation = (punctuation) => {
    if (Number.isInteger(punctuation)) {
        return punctuation.toString(); // Si es un entero, devolverlo como string
    } else {
        return punctuation.toFixed(1); // Si tiene decimales, mostrar un decimal
    }
}

module.exports = getReviewsBySongId;
