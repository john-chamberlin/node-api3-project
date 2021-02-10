// require your server and launch it
const server = require("./api/server");
const PORT = 1234;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
