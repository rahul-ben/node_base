var config = {
  "development": {
    "db_server": {
      "database": "devpanel",
      "host": "mongodb://localhost:27017/devpanel"
    },
    "auth": {
      "secret": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
      "tokenPeriod": 1440
    },
    "web_server": {
      "url": "http://localhost/",
      "port": 3000
    }
  },
  "production": {
    "db_server": {
      "database": "devpanel",
      "host": "mongodb://localhost:27017/devpanel"
    },
    "auth": {
      "secret": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
      "tokenPeriod": 1440
    },
     "web_server": {
      "url": "http://localhost/",
      "port": 3000
    }
  }
};
var node_env = process.env.NODE_ENV || 'development';

module.exports = config[node_env];
