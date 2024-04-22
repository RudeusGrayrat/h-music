const { Users } = require('../../db');

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password']
            },
            
        })

        res.status(200).json(user);
        return user;
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching user:', error);
        throw error;
    }
}

module.exports = getUserById;
