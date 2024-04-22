const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
    // defino el modelo
    sequelize.define('PlaylistDetails', {
    SongsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Songs',
            key: 'id', // 
        },
    },
    PlaylistID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Playlists',
            key: 'id',
        },
    },
},
{
    timestamps: false
})
}
