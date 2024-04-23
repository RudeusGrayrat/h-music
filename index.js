const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {
  DB_PORT
} = process.env;

conn.sync().then(() => {
  server.listen(3001, () => {
    console.log("3001", DB_PORT);
  });
});