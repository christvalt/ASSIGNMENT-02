const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
var cors = require("cors");
var bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//test

//res.cookie('name', 'express').send('cookie set');
//console.log('Cookies: ', req.cookies);
app.get('/', function (req, res) {

  res.send('Hello World!!!!!');
 });

app.use(cors());

const trainRoutes = require('./route/routes')
app.use('/routes', trainRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`Server up and running on port ${port} !!!!`)
  
);
