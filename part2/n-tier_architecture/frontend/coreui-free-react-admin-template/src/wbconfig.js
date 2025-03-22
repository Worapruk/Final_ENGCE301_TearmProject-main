const wbconfig = {
    development: {
      hosturl: 'https://localhost:5007/api',
      wsurl: 'wss://localhost:5007',
      masterKey: 'wallboardapi',
      clientKey: 'wallboardapi',
      javascriptKey: 'wallboardapi',
      appId: 'wallboardapi',
    },
    production: {
      hosturl: 'https://lab-parse-server.cpe-rmutl.net/team07/api',
      wsurl: 'wss://lab-parse-server.cpe-rmutl.net/team07',
      masterKey: 'wallboardapi',
      clientKey: 'wallboardapi',
      javascriptKey: 'wallboardapi',
      appId: 'wallboardapi',
    },
  }
  export default wbconfig[import.meta.env.PROD ? 'production' : 'development']