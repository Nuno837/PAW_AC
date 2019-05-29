const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

exports.createUser = (req, res, next) => {

  var jsonDate = req.body.validade;
  var then = new Date(jsonDate);

  console.log('data ' + then);

  d = dateFormat(then, "mm/yyyy");
  console.log('data ' + d);


  bcrypt.hash(req.body.password, 10 )

  .then(hash => {

    const user = new User ({
      nome: req.body.nome,
      username: req.body.email,
      password: req.body.password,
      endereco: req.body.endereco,
      latlng: req.body.latlng,
      iban: req.body.iban,
      nif: req.body.nif
   
    });
    console.log(user);
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'Utilizador Criado!',
        result: result
      });
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        message: 'Erro ao registar utilizador'
      });
    });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username})
    .then(username => {
      if(!username) {
        return res.status(401).json({
          message: 'Utilizador Não Existe'
        });
      }
      fetchedUser = username;
      return bcrypt.compare(req.body.password, username.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Password Errada'
        });
      }
      const token = jwt.sign(
        {username: fetchedUser.username, userid: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Erro no Login'
      });
    })
};
