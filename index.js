const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {
  DB_PORT
} = process.env;

conn.sync().then(() => {
  server.listen(DB_PORT, () => {
    console.log(`${DB_PORT}`);
  });
});