const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Songs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pathMusic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ArtistID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Artists',
                key: 'id'
            },
        },
        GenreID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Genres',
                key: 'id'
            },
        },
        AlbumsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Albums',
                key: 'id'
            }
        }
    },

        {
            timestamps: false
        }
    );
};
