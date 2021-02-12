// require your server and launch it
const dotenv = require('dotenv').config()
const server = require("./api/server");
const PORT = process.env.PORT || 1234

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
