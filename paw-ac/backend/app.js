const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://fino:TembTk0xzCPI8WCs@cluster0-owlwd.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

module.exports = app;
