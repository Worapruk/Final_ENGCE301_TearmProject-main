const express = require('express');
const { ParseServer } = require('parse-server');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { parseConfig } = require("./config");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const apiport = 5007;


const config = {
  ...parseConfig,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js",
  liveQuery: {
    classNames: [
      "OnlineAgentLists",
      "AgentMessageHistories",
      "AgentStatusHistories",
      "UserLoginHistories",
    ], // List of classes to support for query subscriptions
  },
};
console.log(`Parse config: `, config);

const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'wallboard')));

// Create the Parse Server
const api = new ParseServer(config);

// Mount the Parse Server correctly
app.use('/api', api.app);

// SSL options
var options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

// Create HTTPS server
const httpsServer = require('https').createServer(options, app);
httpsServer.listen(apiport, () => {
  console.log(`Wallboard API (https) running on port ${apiport}`);
});

// Initialize live query server
ParseServer.createLiveQueryServer(httpsServer);

api.start()
