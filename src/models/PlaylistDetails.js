const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
    // defino el modelo
    sequelize.define('PlaylistDetails', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    SongsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Songs',
            key: 'id', // 
        },
    },
    SongsImage:{
        type: DataTypes.STRING,
        allowNull: true,},
        
    PlaylistID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Playlists',
            key: 'id',
        },
    },
    ArtistName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    GenreName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    timestamps: false
})
}
