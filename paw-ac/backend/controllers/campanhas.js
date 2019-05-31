const Campanha = require('../models/campanha');

exports.criarCampanha = (req, res, next) => {
  const campanha = new Campanha({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    iban: req.body.iban,
    goal: req.body.goal
  });
  campanha.save().then(createdCampanha => {
    res.status(201).json({
      message: 'Campanha criada com sucesso',
      campanhaId: createdCampanha._id
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Erro ao criar campanha'
    })
  });
};

exports.getCampanhas = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  campanhaQuery = Campanha.find();
  let campanhasAdq;
  if(pageSize && currentPage){
    campanhaQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
    campanhaQuery
    .then(documents => {
      campanhasAdq = documents;
      return Campanha.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'campanhas Obtidas com Sucesso',
        campanhas: campanhasAdq,
        maxcampanhas: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter campanhas'
    });
  });
};

exports.getCampanha = (req, res, next) => {
  Campanha.findById(req.params.id).then(campanha => {
    if(campanha) {
      res.status(200).json(campanha);
    } else {
      res.status(404).json({message: 'Campanha Não Existe'});
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Campanha'
    });
  });
};
