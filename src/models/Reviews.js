const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        punctuation: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: 0.5,
                max: 5
            }
        },        
        SongsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Songs',
                key: 'id'
            },
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
    });
}
