const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {
  DB_PORT
} = process.env;

conn.sync({ alter: true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log(`${DB_PORT}`);
  });
});