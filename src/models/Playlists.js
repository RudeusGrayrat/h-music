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
        }
    },
        {
            timestamps: false
        }
    )
};
