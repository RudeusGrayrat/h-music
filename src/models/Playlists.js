const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Playlists', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UsersID: {
            type: DataTypes.UUID,
            allownNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://res.cloudinary.com/daux5omzt/image/upload/v1714744822/_56ac101c-5d48-452d-8636-b5ba601f8326_ldluc5.jpg"
        }
    },
        {
            timestamps: false
        }
    )
};
