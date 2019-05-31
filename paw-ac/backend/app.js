const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const campanhaRoutes = require('./routes/campanha');
const userR = require('./routes/user');
const donationrouter= require('./routes/donation');


const app = express();

mongoose.connect('mongodb+srv://fino:TembTk0xzCPI8WCs@cluster0-owlwd.mongodb.net/cenas?retryWrites=true', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/campanhas', campanhaRoutes);
app.use('/api/user', userR);
app.use('/api/donations', donationrouter)

module.exports = app;
