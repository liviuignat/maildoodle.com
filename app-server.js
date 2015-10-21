const config = require('config');
const Server = require(config.serverFile).Server;
new Server().start();
