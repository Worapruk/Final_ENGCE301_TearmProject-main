module.exports = {
    development: {
      parseConfig: {
        databaseURI:
          "mongodb://wallboarduser:WB1qazxsw2@192.168.64.5:27017/wallboarddb",
        appId: "wallboardapi",
        masterKey: "wallboardapi", //Add your master key here. Keep it secret!
        clientKey: "wallboardapi",
        javascriptKey: "wallboardapi",
        serverURL: "https://localhost:5007/api", // Don't forget to change to https if needed
        publicServerURL: "https://localhost:5007/api",
      },
    },
    production: {
      parseConfig: {
        databaseURI:
          "mongodb://wallboarduser:WB1qazxsw2@10.21.47.33:27017/wallboarddb-team7",
        appId: "wallboardapi",
        masterKey: "wallboardapi", //Add your master key here. Keep it secret!
        clientKey: "wallboardapi",
        javascriptKey: "wallboardapi",
        serverURL: "https://lab-parse-server.cpe-rmutl.net/team07/api", // Don't forget to change to https if needed
        publicServerURL: "https://lab-parse-server.cpe-rmutl.net/team07/api",
      },
    },
  }[process.env.NODE_ENV === "production" ? "production" : "development"];