const express = require('express');

const router = express.Router();

const CampanhaController = require('../controllers/campanhas');

const DonationController = require('../controllers/donations');
router.post('', CampanhaController.criarCampanha);

router.get('', CampanhaController.getCampanhas);

router.get('/:id', CampanhaController.getCampanha);

router.put('/:id', CampanhaController.editCampanha);

router.put('/:id', DonationController.criarDonation);

router.delete('/:id', CampanhaController.deleteCampanha);

module.exports = router;
