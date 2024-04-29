const { Reviews, Users, Songs } = require('../../db');

const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name', 'image']
                },
                {
                    model: Songs,
                    attributes: ['name']
                }
            ]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ error: 'No hay revisiones disponibles' });
        } else {
            return res.status(200).json(reviews);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = getReviews;
