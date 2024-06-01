'use-strict'
const cors = require('cors')
const whitelist = [
    'http://localhost:4200', 
    'http://localhost'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports=cors({ corsOptions })