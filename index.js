const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {
  PORT
} = process.env;

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`${PORT}`);
  });
});