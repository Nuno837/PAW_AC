const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10 )

  .then(hash => {

    const user = new User ({
      nome: req.body.nome,
      username: req.body.username,
      password: hash,
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
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'Utilizador Não Existe'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Password Errada'
        });
      }
      console.log(fetchedUser);
      
      const token = jwt.sign(
        {username: fetchedUser.username, userid: fetchedUser._id},
        'process.env.JWT_KEY',
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userid: fetchedUser._id
      });
    })
    .catch(err => {
        console.log(err);
        
      return res.status(401).json({
        message: 'Erro no Login'
      });
    })
};
