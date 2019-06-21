require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

let whitelist = ['http://192.168.100.78','http://192.168.100.24','http://192.168.100.78','http://192.168.100.49', 'http://example2.com','http://localhost:3000']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

routes(app);

app.listen(port);