require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/h_music`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Artists, Songs, Genres, Playlists, Users, PlaylistDetails, Likes, Albums } = sequelize.models;

//relación "uno a muchos" entre Artistas y Canciones
Artists.hasMany(Songs, { foreignKey: 'ArtistID' });
Songs.belongsTo(Artists, { foreignKey: 'ArtistID' });

//relación "uno a muchos" entre Géneros y Canciones
Genres.hasMany(Songs, { foreignKey: 'GenreID' });
Songs.belongsTo(Genres, { foreignKey: 'GenreID' });

//relación "uno a muchos" entre Usuarios y Listas de Reproducción
Users.hasMany(Playlists, { foreignKey: 'UsersID' });
Playlists.belongsTo(Users, { foreignKey: 'UsersID' });

//relación "muchos a muchos" entre Canciones y Listas de Reproducción
Songs.belongsToMany(Playlists, { through: PlaylistDetails, foreignKey: 'SongsID' });
Playlists.belongsToMany(Songs, { through: PlaylistDetails, foreignKey: 'PlaylistID' });

//relación "muchos a muchos" entre Usuarios y Listas de Reproducción a través de Likes
Users.belongsToMany(Playlists, { through: Likes, foreignKey: 'UsersID' });
Playlists.belongsToMany(Users, { through: Likes, foreignKey: 'PlaylistID' });

//relacion "uno a muchos" entre Albunes y Canciones
Albums.hasMany(Songs, { foreignKey: "AlbumsID"});
Songs.belongsTo(Albums, {foreignKey: "AlbumsID"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
