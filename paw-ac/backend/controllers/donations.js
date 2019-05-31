const Donation = require('../models/donations');
exports.criarDonation = (req, res, next) => {
    const donation = new Donation({
        user: req.body.user,
        valor: req.body.valor,
        estado: req.body.estado

    });
    donation.save().then(createdDonation => {
        res.status(201).json({
            message: 'Donation criada com sucesso',
            donationId: createdDonation._id
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Erro ao criar Donation'
            })
        });
};

exports.getDonations = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = req.query.page;
    donationQuery = Donation.find();
    let donationsAdq;
    if (pageSize && currentPage) {
        donationQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    donationQuery
        .then(documents => {
            donationsAdq = documents;
            return Donation.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Donations Obtidas com Sucesso',
                donations: donationsAdq,
                maxdonations: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Erro ao Tentar Obter donations'
            });
        });
};

exports.getDonation = (req, res, next) => {
    Donation.findById(req.params.id).then(donation => {
        if (donation) {
            res.status(200).json(donation);
        } else {
            res.status(404).json({ message: 'Donation Não Existe' });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Erro ao Tentar Obter Donation'
        });
    });
};