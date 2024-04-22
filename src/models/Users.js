const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.ENUM,
            values: ['gratis', 'registrado', 'premium', 'baneado', 'admin'],
            allowNull: false,
            defaultValue: 'gratis'
        },

        esta_verificado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },

        verification_token: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
        }

            
        
    },
        {
            timestamps: false
        }
    )
};
