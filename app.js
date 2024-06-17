const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routes/router.js")
require('dotenv').config();

const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api" , route)

module.exports = app;
