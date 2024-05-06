const { Router } = require('express');

const getSongs = require("../controllers/Songs/getSongs");
const getSongById = require("../controllers/Songs/getSongById");
const getSongByTitle = require("../controllers/Songs/getSongByTitle");
const postUsers = require('../controllers/Users/postUsers');
const postSongs = require("../controllers/Songs/postSongs");
const postGenres = require('../controllers/Genres/postGenres');
const getSongsByGenre = require("../controllers/Songs/getSongsByGenre"); 
const getReviews = require("../controllers/Reviews/getReviews");
const getReviewsBySongId = require("../controllers/Reviews/getSongsReviews");
const postReviews = require("../controllers/Reviews/postReview");
const getArtist = require('../controllers/Artists/getArtists');
const getGenres = require('../controllers/Genres/getGenres');
const postArtists = require('../controllers/Artists/postArtists');
const getUsers = require('../controllers/Users/getUsers');
const login = require('../controllers/Users/login');
const postPlaylist = require('../controllers/Playlists/postPlaylist');
const postSongToPlaylist = require('../controllers/Playlists/postSongToPlaylist');
const getPlaylist = require('../controllers/Playlists/getPlaylist');
const getPlaylistDetail = require('../controllers/Playlists/getPlaylistDetail');
const postSavingPlaylist = require('../controllers/Likes/postSavingPlaylist');
const getUserPlaylist = require('../controllers/Playlists/getUserPlaylist');
const getAlbums = require('../controllers/Albums/getAlbums');
const postAlbums = require('../controllers/Albums/postAlbums');
const getUserById = require('../controllers/Users/getUserById');
const putUser = require('../controllers/Users/putUser');
const verification  = require('../controllers/Verification/verification');
const changeVerificationStatus = require('../controllers/Verification/changeVerificationStatus');
const Pay = require('../controllers/PasarelaStripe/Pay');
const Paied = require('../controllers/PasarelaStripe/Paied');
const putRol = require('../controllers/Users/putRol');
const putUserNameAndPic = require('../controllers/Users/putUserNameAndPic');
const verifcationMiddleware = require('../utils/verificationMiddleware');
const banUser = require('../controllers/Users/banUser');
const unBanUser = require('../controllers/Users/unBanUser');
const putPlaylist = require('../controllers/Playlists/putPlaylist');
const deletePlaylist = require('../controllers/Playlists/deletePlaylist');
const deleteSongInPlaylist = require('../controllers/Playlists/deleteSongInPlaylist');

const router = Router();

router.get("/songs", getSongs);
router.get("/songs/:idSong", getSongById);
router.get("/songs/search/:name", getSongByTitle);
router.get("/songs/genre/:genreId", getSongsByGenre); 
router.get("/reviews", getReviews);
router.get("/reviews/:songId", getReviewsBySongId);
router.get("/artists", getArtist);
router.get("/genres", getGenres);
router.get("/albums", getAlbums);
router.get("/login", login);
router.get("/users", getUsers); //jwt
router.get("/users/:userId", getUserById);
router.get("/getUserPlaylist/:userId", getUserPlaylist);
router.get("/getPlaylist", getPlaylist);
router.get("/getPlaylistDetail/:id", getPlaylistDetail);

router.get("/verification", verification);

router.put("/users/:userId/editPasword", verifcationMiddleware, putUser);
router.put("/verification/changeStatus", changeVerificationStatus);
router.put("/editRol", verifcationMiddleware, putRol);
router.put("/playlist/putPlaylist", putPlaylist);
router.put("/users/:id/banUser", verifcationMiddleware, banUser);
router.put("/users/:id/unbanUser", verifcationMiddleware, unBanUser);
router.put("/users/editNameAndPic/:id", verifcationMiddleware, putUserNameAndPic);

router.post("/users", postUsers);
router.post("/pay", Pay);
router.post("/paied", Paied);

router.post("/songs", verifcationMiddleware, postSongs);  //jwt
router.post("/genres", postGenres);
router.post("/artists", postArtists);
router.post("/reviews", postReviews);
router.post("/playlist", postPlaylist);
router.post("/postPlaylist", postSongToPlaylist);
router.post("/postSavingPlaylist", postSavingPlaylist);
router.post("/albums", postAlbums);

router.delete("/playlist/deleteSongFromPlaylist", deleteSongInPlaylist);
router.delete("playlist/deletePlaylist/:id", deletePlaylist);


module.exports = router;
