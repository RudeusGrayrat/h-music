const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {
  DB_PORT
} = process.env;

conn.sync().then(() => {
  server.listen(39202, () => {
    console.log("3001");
  });
});