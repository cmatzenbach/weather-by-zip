const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

require('dotenv').config();

const app = express();
require('./models/Weather');

// middleware parser to assign json to req.body
app.use(bodyParser.json());

require('./routes/Routes')(app);

if (process.env.NODE_ENV === 'production') {
  // ensuring express serves up production assets
  app.use(express.static('client/build'));

  // serve up index.html if express doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(5000);
